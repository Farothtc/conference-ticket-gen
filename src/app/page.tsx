"use client";
import Image from "next/image";
import ConferenceForm from "./Components/ConferenceForm";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");
  const [submitMyTick, setSubmitMyTick] = useState(false);

  const [participantCred, setParticipantCred] = useState({
    fullName: "",
    email: "",
    git: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(participantCred, "global");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      setFileError("No file is selected");
      return;
    }
    if (file?.size > 500 * 1024) {
      setFileError("File too large. Please upload a photo under 500KB.");
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file?.type)) {
      setFileError("Wrong image format.");
      return;
    }
    setFileError("");
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleChangeFile = () => {
    setPreviewUrl(null);
  };

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setParticipantCred((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleTicketSubmit = () => {
    if (
      participantCred.email &&
      participantCred.fullName &&
      participantCred.git &&
      selectedFile
    ) {
      setSubmitMyTick(true);
    }
    if (!selectedFile) {
      setFileError("You have to upload a photo");
    }
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
    <main className="relative min-h-screen bg-[url('/background-mobile.png')] sm:bg-[url('/background-desktop.png')] sm:bg-cover sm:bg-no-repeat">
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
      <div className="absolute right-0 top-0 w-[200px] h-[100px] md:w-auto md:h-auto">
        <Image
          src={"/pattern-squiggly-line-top.svg"}
          alt="Line"
          width={446}
          height={208}
          className="w-auto h-auto"
        ></Image>
      </div>
      {submitMyTick ? (
        <section className="relative flex flex-col justify-center items-center pt-10">
          <div>
            <Image
              src={"/logo-full.svg"}
              alt="Logo"
              width={210}
              height={30}
            ></Image>
          </div>
          <div className="flex flex-col justify-center items-center pt-20 text-2xl p-5 md:text-5xl gap-2 md:gap-4 font-bold tracking-widest">
            <h1 className="text-center">
              Congrats,{" "}
              <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                {participantCred.fullName + "!"}
              </span>
              {isMobile ? " Your ticket is ready." : ""}
            </h1>
            {isMobile ? "" : <h2>Your ticket is ready.</h2>}
          </div>
          <div className="pt-5 p-5 text-xl text-gray-400 tracking-widest flex justify-center text-wrap items-center w-full md:w-[35%]">
            <h1 className="text-center">
              We&apos;ve emailed your ticket to{" "}
              <span className="text-red-400">{participantCred.email}</span> and
              will send updates in the run up to the event.
            </h1>
          </div>
          <div className="relative pt-24">
            <div className="absolute p-8">
              <Image
                src={"/logo-full.svg"}
                alt="logo"
                width={209}
                height={30}
              ></Image>
              <h1 className="sm:py-6 px-12 tracking-widest text-gray-400 text-sm sm:text-base">
                Jan 31, 2025 / Austin, TX
              </h1>
            </div>
            <div className="absolute flex gap-4 bottom-0 p-8 sm:p-5 w-full">
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Avatar"
                  width={isMobile ? 50 : 90}
                  height={isMobile ? 50 : 90}
                  className="rounded-xl"
                ></Image>
              )}
              <div className="flex flex-col justify-center items-start gap-3">
                <h1 className="text-base sm:text-2xl tracking-wider">
                  {participantCred.fullName}
                </h1>
                <div className="flex justify-center items-center gap-2">
                  <Image
                    src={"/icon-github.svg"}
                    alt="Icon"
                    width={23}
                    height={23}
                  ></Image>
                  <h1 className="text-gray-400">{participantCred.git}</h1>
                </div>
              </div>
            </div>
            <h1 className="text-gray-500 text-xl sm:text-2xl absolute right-0 top-[65%] sm:top-[60%] pe-5 rotate-90">
              #01609
            </h1>
            <Image
              src={"/pattern-ticket.svg"}
              alt="ticket"
              width={600}
              height={280}
              className="block p-4 md:p-0"
            ></Image>
          </div>
        </section>
      ) : (
        <section className="relative flex flex-col justify-center items-center pt-10">
          <div>
            <Image
              src={"/logo-full.svg"}
              alt="Logo"
              width={210}
              height={30}
            ></Image>
          </div>
          <div className="flex flex-col justify-center items-center pt-10 text-xl md:text-5xl gap-4 font-bold tracking-wider text-white">
            <h1>Your Journey to Coding Conf</h1>
            <h2>2025 Starts Here!</h2>
          </div>
          <div className="pt-5 text-sm flex md:text-xl text-gray-400 tracking-widest">
            <h1 className="text-center">
              Secure your spot at the next year&apos;s biggest coding
              conference.
            </h1>
          </div>
          <ConferenceForm
            handleFileChange={handleFileChange}
            previewUrl={previewUrl}
            selectedFile={selectedFile}
            onRemoveFile={handleRemoveFile}
            onChangeFile={handleChangeFile}
            participantCred={participantCred}
            handleChangeInput={handleChangeInput}
            fileError={fileError}
            handleTicketSubmit={handleTicketSubmit}
          />
        </section>
      )}
    </main>
  );
}
