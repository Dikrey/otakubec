import { NextResponse, NextRequest } from "next/server";
import home from "@/utils/home";

// Caching: Simpan hasil scrape selama 30 Menit (1800 detik)
// Sangat ampuh untuk mencegah IP terkena limit/blokir Cloudflare
export const revalidate = 1800; 

export async function GET(request: NextRequest) {
  try {
    const data = await home();

    // Validasi jika data kosong akibat blokir Cloudflare
    if (!data || (data.ongoing_anime?.length === 0 && data.complete_anime?.length === 0)) {
       return NextResponse.json(
         { 
           success: false, 
           message: "Gagal memuat data. Kemungkinan IP diblokir oleh Cloudflare." 
         },
         { status: 502 }
       );
    }

    // Response Sukses + CORS Header agar bisa difetch dari website mana saja
    return NextResponse.json(
      { 
        success: true, 
        message: "Berhasil mengambil data",
        data: data 
      }, 
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );

  } catch (error: any) {
    // Tangkap error jika website Otakudesu down atau timeout
    return NextResponse.json(
      { 
        success: false, 
        message: "Terjadi kesalahan internal server.", 
        error: error.message 
      }, 
      { status: 500 }
    );
  }
}