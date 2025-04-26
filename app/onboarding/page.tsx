"use client";

import PillSelectRadio from "@/components/pill-select-radio";
import { useState } from "react";
import { useRouter } from "next/navigation";

class OnboardingForm {
  classYear: string;
  role: string;

  constructor() {
    this.classYear = "";
    this.role = "";
  }
}

class OnboardingFormErrors {
  classYear: string;
  role: string;

  constructor() {
    this.classYear = "";
    this.role = "";
  }

  isErrors() {
    return Object.values(this).some((error) => error !== ""); // check to see if there is at least one property that is not an empty string
  }
}

export default function Onboarding() {
  const router = useRouter();
  const fieldErrors = new OnboardingFormErrors();

  const [selectedClassYear, setSelectedClassYear] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [errors, setErrors] = useState(fieldErrors);

  const [serverError, setServerError] = useState("");

  const handleClassYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClassYear(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
  };

  const validate = () => {
    const errors = new OnboardingFormErrors();

    if (!selectedClassYear.trim()) {
      console.log("classYear not selected");
      errors.classYear = "Class year not selected";
    }

    if (!selectedRole.trim()) {
      console.log("role not selected");
      errors.role = "Role not selected";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent immediate page refresh; allows custom logic

    const currErrors = validate();
    if (currErrors.isErrors()) {
      console.log("setting errors");
      console.log(currErrors);
      setErrors(currErrors);
      return;
    }

    const payload = {
      accountDetails: {
        classYear: selectedClassYear,
        isOnboarded: true,
        role: selectedRole.toLowerCase(),
      },
    };

    const response = await fetch("/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setServerError("Internal server error occurred. Retry.");
    } else if (response.ok) {
      router.push("/classes");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-xl mb-2">Let's get onboarded.</h1>
        <div className="flex flex-col">
          <label className="mb-2">I am a(n)</label>
          <div className="flex flex-row mb-2">
            <PillSelectRadio
              name="Student"
              selectionState={selectedRole}
              formGroupIdentifier="role"
              handleSelectionChange={handleRoleChange}
              error={errors.classYear}
              pillWidth={6}
            />
            <PillSelectRadio
              name="Faculty"
              selectionState={selectedRole}
              formGroupIdentifier="role"
              handleSelectionChange={handleRoleChange}
              error={errors.classYear}
              pillWidth={5.5}
            />
          </div>
          <label className="mb-2">What is your current class standing?</label>
          <div className="flex flex-row">
            <PillSelectRadio
              name="Fr"
              selectionState={selectedClassYear}
              formGroupIdentifier="classYear"
              handleSelectionChange={handleClassYearChange}
              error={errors.classYear}
            />
            <PillSelectRadio
              name="So"
              selectionState={selectedClassYear}
              formGroupIdentifier="classYear"
              handleSelectionChange={handleClassYearChange}
              error={errors.classYear}
            />
            <PillSelectRadio
              name="Jr"
              selectionState={selectedClassYear}
              formGroupIdentifier="classYear"
              handleSelectionChange={handleClassYearChange}
              error={errors.classYear}
            />
            <PillSelectRadio
              name="Sr"
              selectionState={selectedClassYear}
              formGroupIdentifier="classYear"
              handleSelectionChange={handleClassYearChange}
              error={errors.classYear}
            />
            <PillSelectRadio
              name="Fac"
              selectionState={selectedClassYear}
              formGroupIdentifier="classYear"
              handleSelectionChange={handleClassYearChange}
              error={errors.classYear}
              textOffset={-4.5}
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <button type="submit" className="cursor-pointer">
              Create Account
            </button>
          </div>
          {serverError !== "" && (
            <div className="pt-1 text-red-700 text-[0.7rem]">{serverError}</div>
          )}
        </div>
      </form>
    </div>
  );
}
