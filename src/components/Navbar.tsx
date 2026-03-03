"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { FiGithub } from "react-icons/fi";
import { SiVercel } from "react-icons/si";

export default function App() {
  return (
    <Navbar 
      isBordered
      isBlurred
      className="border-white/10 bg-white/5"
    >
      <NavbarBrand>
        <SiVercel className="w-6 h-6 text-white" />
        <p className="font-bold text-inherit text-white ml-2">OtakuBeHanz</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href="https://github.com/Hanz-Creator"
            target="_blank"
            rel="noopener noreferrer"
            variant="bordered"
            className="border-white/20 text-white"
            startContent={<FiGithub />}
          >
            GitHub
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
