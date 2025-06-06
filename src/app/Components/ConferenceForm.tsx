"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ConferenceFormProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
  onRemoveFile: () => void;
  onChangeFile: () => void;
  handleTicketSubmit: () => void;
  participantCred: {
    fullName: string;
    email: string;
    git: string;
  };
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileError: string;
}

export default function ConferenceForm({
  handleFileChange,
  previewUrl,
  onRemoveFile,
  onChangeFile,
  participantCred,
  handleChangeInput,
  handleTicketSubmit,
  fileError,
}: ConferenceFormProps) {
  const [nameError, setNameError] = useState("");
  const [mailError, setMailError] = useState("");
  const [gitError, setGitError] = useState("");

  const handleRemove = () => {
    onRemoveFile();
  };

  const handleChangeImage = () => {
    onChangeFile();
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const syntheticEvent = {
        target: { files: files } as HTMLInputElement,
        currentTarget: { files: files } as HTMLInputElement,
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 3,
        isTrusted: true,
        nativeEvent: event.nativeEvent,
        preventDefault: () => event.preventDefault(),
        isDefaultPrevented: () => event.isDefaultPrevented(),
        stopPropagation: () => event.stopPropagation(),
        isPropagationStopped: () => event.isPropagationStopped(),
        persist: () => {},
        timeStamp: event.timeStamp,
        type: "change",
      } as React.ChangeEvent<HTMLInputElement>;

      handleFileChange(syntheticEvent);
    }
  };

  // Name Handlers

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNameError("");
      handleChangeInput(event);
    } else {
      setNameError("Wrong name format");
    }
  };

  const handleNameBlur = () => {
    if (participantCred.fullName.trim() === "") {
      setNameError("Cannot be blank");
    } else {
      setNameError("");
    }
  };

  // Email Handlers

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setMailError("");
      handleChangeInput(event);
    } else {
      setMailError("Please enter a valid email address.");
    }
  };

  const handleEmailBlur = () => {
    if (participantCred.email.trim() === "") {
      setMailError("Can not be blank");
    } else {
      setMailError("");
    }
  };

  // Git Handlers

  const handleGitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setGitError("");
      handleChangeInput(event);
    } else {
      setGitError("Error");
    }
  };

  const handleGitBlur = () => {
    if (participantCred.git.trim() === "") {
      setGitError("Can not be blank");
    } else {
      setGitError("");
    }
  };

  return (
    <section className="pt-10 w-[90%] md:w-[50%] lg:w-[25%]">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="pb-3 text-base tracking-wide text-white">
            Upload Avatar
          </h1>
          <label
            htmlFor="avatar-upload"
            className="file-upload flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-500/60 bg-gray-700/40 rounded-2xl cursor-pointer hover:bg-gray-700/70"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {previewUrl ? (
                <div className="w-12 h-12 border-1 rounded-2xl border-gray-400">
                  <Image
                    src={previewUrl}
                    alt="Upload"
                    height={160}
                    width={160}
                    className="w-full h-full rounded-2xl"
                  ></Image>
                </div>
              ) : (
                <button className="btn btn-ghost bg-gray-500/40 rounded-xl w-12 h-12 p-2">
                  <Image
                    src={"/icon-upload.svg"}
                    alt="Upload"
                    height={30}
                    width={30}
                    className="w-full h-full"
                  ></Image>
                </button>
              )}

              {previewUrl ? (
                <div className="flex justify-center items-center pt-3 gap-3 text-white">
                  <button
                    className="btn btn-xs bg-transparent border-0 shadow-none hover:underline hover:bg-gray-700/70"
                    onClick={handleRemove}
                  >
                    Remove image
                  </button>
                  <button
                    className="btn btn-xs bg-transparent border-0 shadow-none hover:underline hover:bg-gray-700/70"
                    onClick={handleChangeImage}
                  >
                    Change image
                  </button>
                </div>
              ) : (
                <p className="text-base text-gray-400 pt-3 tracking-widest">
                  Drag and drop or click to upload
                </p>
              )}
            </div>
            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {fileError ? (
            <div className="flex justify-start items-center gap-2 pt-3">
              <Image
                src={"/icon-danger-info.svg"}
                alt="Info"
                height={16}
                width={16}
              ></Image>
              <p className="text-xs text-red-500 ">{fileError}</p>
            </div>
          ) : (
            <div className="flex justify-start items-center gap-2 pt-3">
              <Image
                src={"/icon-info.svg"}
                alt="Info"
                height={16}
                width={16}
              ></Image>
              <p className="text-xs text-gray-400 ">
                Upload your photo (JPG or PNG, max size: 500KB).
              </p>
            </div>
          )}
        </div>
        {/* Name */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-base tracking-wide font-medium text-white">
            Full Name
          </legend>
          <input
            type="text"
            className={`input w-full bg-gray-700/40 rounded-lg hover:bg-gray-700/70 text-white ${
              nameError ? "border-red-500" : ""
            }`}
            name="fullName"
            value={participantCred.fullName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          />
          {nameError && (
            <div className="flex justify-start items-center gap-2 pt-1">
              <Image
                src={"/icon-danger-info.svg"}
                alt="Info"
                height={16}
                width={16}
              ></Image>
              <p className="text-xs text-red-500 ">{nameError}</p>
            </div>
          )}
        </fieldset>
        {/* Email */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-base tracking-wide font-medium text-white">
            Email Address
          </legend>
          <input
            type="email"
            className={`input w-full bg-gray-700/40 rounded-lg hover:bg-gray-700/70 ${
              mailError ? "border-red-500" : ""
            }`}
            name="email"
            value={participantCred.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder="example@email.com"
          />
          {mailError && (
            <div className="flex justify-start items-center gap-2 pt-1">
              <Image
                src={"/icon-danger-info.svg"}
                alt="Info"
                height={16}
                width={16}
              ></Image>
              <p className="text-xs text-red-500 ">{mailError}</p>
            </div>
          )}
        </fieldset>
        {/* Github */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-base tracking-wide font-medium text-white">
            GitHub Username
          </legend>
          <input
            type="text"
            className={`input w-full bg-gray-700/40 rounded-lg hover:bg-gray-700/70 ${
              gitError ? "border-red-500" : ""
            }`}
            name="git"
            value={participantCred.git}
            onChange={handleGitChange}
            onBlur={handleGitBlur}
            placeholder="@yourusername"
          />
          {gitError && (
            <div className="flex justify-start items-center gap-2 pt-1">
              <Image
                src={"/icon-danger-info.svg"}
                alt="Info"
                height={16}
                width={16}
              ></Image>
              <p className="text-xs text-red-500 ">{gitError}</p>
            </div>
          )}
        </fieldset>
        {/* Submit Button */}
        <button
          className="btn text-black w-full bg-red-400 rounded-lg border-red-400 mb-2"
          onClick={handleTicketSubmit}
        >
          Generate My Ticket
        </button>
      </div>
    </section>
  );
}
