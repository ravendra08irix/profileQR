import React, { useState, useEffect, useRef } from "react";
import { BrowserQRCodeSvgWriter } from "@zxing/library";

const QRCodeForm = () => {
  const [details, setDetails] = useState({
    name: "",
    landline: "",
    mobile: "",
    email: "",
    website: "",
    address: "",
    company: "",
    designation: "",
  });
  const [qrValue, setQrValue] = useState("");
  const qrCodeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formattedDetails = `Name: ${details.name}\nCompany: ${details.company}\nDesignation: ${details.designation}\nMobile: ${details.mobile}\nEmail: ${details.email}\nWebsite: ${details.website}\nAddress: ${details.address}`;

    if (details.landline.trim()) {
      formattedDetails += `\nLandline: ${details.landline}`;
    }

    const qrUrl = `${
      window.location.origin
    }/scanned-data?data=${encodeURIComponent(formattedDetails)}`;
    setQrValue(qrUrl);
  };

  useEffect(() => {
    if (qrValue) {
      const codeWriter = new BrowserQRCodeSvgWriter();
      codeWriter.writeToDom(qrCodeRef.current, qrValue, 180, 180);
    }
  }, [qrValue]);

  const downloadQRCode = () => {
    const svg = qrCodeRef.current.querySelector("svg");
    if (svg) {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      console.error("SVG element not found.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h3 className="text-2xl font-bold text-center text-blue-700 mb-6">
        QR Profile Generator
      </h3>
      {!qrValue ? (
        <form
          method="post"
          className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={details.name}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-gray-700 font-semibold"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={details.company}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="designation"
                className="block text-gray-700 font-semibold"
              >
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={details.designation}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="landline"
                className="block text-gray-700 font-semibold"
              >
                Landline Number
              </label>
              <input
                type="text"
                id="landline"
                name="landline"
                value={details.landline}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-semibold"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={details.mobile}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="website"
                className="block text-gray-700 font-semibold"
              >
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={details.website}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 font-semibold"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={details.address}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 mt-4"
          >
            Generate QR Code
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center mt-8">
          <div ref={qrCodeRef} id="qrcode" className="mb-4"></div>
          <button
            onClick={downloadQRCode}
            className="bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeForm;
