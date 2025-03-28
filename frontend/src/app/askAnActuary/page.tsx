"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import ReCAPTCHA from "react-google-recaptcha"
import { set } from "zod"

export default function AskActuaryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [captchaVerified, setCaptchaVerified] = useState(false)

  const recaptchaRef :any = React.createRef();
  const [isLoading,setIsLoading] = useState(false)

  const onChange = (value: string | null) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const asyncScriptOnLoad = () => {
    console.log('Google recaptcha loaded just fine')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }

    try {
      setIsLoading(true)
      const response = await fetch("https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/askAnActuary/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setCaptchaVerified(false);
        setIsLoading(false)
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        alert("Query submitted successfully!");
      } else {
        setIsLoading(false)
        console.error("Form submission failed:", response.status);
        alert(`Form submission failed. Please try again. Status: ${response.status}`);
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const featuredQuestions = [
    {
      id: 1,
      question: "Question no one",
      answer:
        "The insurance industry is constantly evolving, driven by economic shifts, technological advancements, and crucially, regulatory changes. Insurers today face a complex web of regulations designed to protect consumers, ensure solvency, and maintain market stability. Understanding and adapting to these changes is crucial for success in the modern insurance landscape.",
    },
    {
      id: 2,
      question: "Question no two",
      answer:
        "The insurance industry is constantly evolving, driven by economic shifts, technological advancements, and crucially, regulatory changes. Insurers today face a complex web of regulations designed to protect consumers, ensure solvency, and maintain market stability. Understanding and adapting to these changes is crucial for success in the modern insurance landscape.",
    },
    {
      id: 3,
      question: "Question no three",
      answer:
        "The insurance industry is constantly evolving, driven by economic shifts, technological advancements, and crucially, regulatory changes. Insurers today face a complex web of regulations designed to protect consumers, ensure solvency, and maintain market stability. Understanding and adapting to these changes is crucial for success in the modern insurance landscape.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hero Section */}
      <div className="bg-[#0074a611] py-16 text-center pt-[11.5rem]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#00415f] mb-4">Ask an Actuary</h1>
        <p className="text-lg text-gray-700">Pose your actuarial questions and explore insightful discussions.</p>
      </div>

      {/* Form Section */}
      <section className="max-w-2xl mx-auto px-4 py-12 w-full h-full">
        <h2 className="text-3xl font-bold text-[#00415f] text-center mb-8">Have a Question? Ask Us!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Question
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full h-32"
            />
          </div>

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            onChange={onChange}
            asyncScriptOnLoad={asyncScriptOnLoad}
          />

          {!isLoading ? <Button 
          type="submit" 
          disabled={!captchaVerified} 
          className="w-full bg-[#0073a6] hover:bg-[#00415f] text-white">
            Submit Question
          </Button> : <Button 
          disabled={true} 
          className="w-full bg-[#0073a6] hover:bg-[#00415f] text-white">
            Submitting...
          </Button>}
        </form>
      </section>

      {/* Featured Questions Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#00415f] text-center mb-8">Featured Questions & Answers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQuestions.map((item) => (
              <div key={item.id} className="bg-[#0074a611] rounded-lg p-6 flex flex-col items-start">
                <h3 className="font-semibold text-[#00415f] mb-2">Question: {item.question}</h3>
                <p className="text-gray-600 mb-4 flex-grow">Answer: <br></br>{item.answer.substring(0, 150)}...</p>
                <Button variant="link" className="text-[#0073a6] hover:text-[#00415f] p-0 h-auto font-semibold " onClick={() => alert(item.answer)}>
                  Read full answer
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
