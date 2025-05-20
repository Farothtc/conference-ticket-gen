"use client";
import Image from "next/image";
import ConferenceForm from "./Components/ConferenceForm";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);
  return (
    <main className="relative min-h-screen bg-[url('/background-desktop.png')] bg-cover bg-no-repeat">
      {/* Top Lines */}
      <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center w-auto h-auto">
        <Image
          src={"/pattern-lines.svg"}
          alt="line"
          width={1459}
          height={1024}
          className="w-auto h-auto"
        ></Image>
      </div>
      {/* Left Line */}
      <div className="absolute left-0 bottom-0">
        <Image
          src={"/pattern-squiggly-line-bottom-desktop.svg"}
          alt="Line"
          width={825}
          height={400}
          className="w-auto h-auto"
        ></Image>
      </div>
      {/* Top right Line */}
      <div className="absolute right-0 top-0">
        <Image
          src={"/pattern-squiggly-line-top.svg"}
          alt="Line"
          width={446}
          height={208}
          className="w-auto h-auto"
        ></Image>
      </div>
      <section className="relative flex flex-col justify-center items-center pt-10">
        <div>
          <Image
            src={"/logo-full.svg"}
            alt="Logo"
            width={210}
            height={30}
          ></Image>
        </div>
        <div className="flex flex-col justify-center items-center pt-10 text-5xl gap-4 font-bold tracking-wider">
          <h1>Your Journey to Coding Conf</h1>
          <h2>2025 Starts Here!</h2>
        </div>
        <div className="pt-5 text-xl text-gray-400 tracking-widest">
          <h1>
            Secure your spot at the next year&apos;s biggest coding conference.
          </h1>
        </div>
        <ConferenceForm
          handleFileChange={handleFileChange}
          previewUrl={previewUrl}
        />
      </section>
    </main>
  );
}
