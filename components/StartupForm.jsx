"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  async function handleFormSubmit(prevState, formData) {
    try {
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        link: formData.get("link"),
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log(formValues);
      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your blog has been created successfully",
        });
      }

      // ? redirect to that pitch
      router.push(`/startup/${result._id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An error occurred while submitting the form",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An error occurred while submitting the form",
        status: "ERROR",
      };
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form ">
      {/* title */}
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Blog Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      {/* description */}
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Blog Description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      {/* category */}
      {/* add functionality to choose from existing category if not available others as in drop down list */}
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Blog Category (Tech, Health, Education ...)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      {/* image URL */}
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Blog Image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      {/* markdown - pitch */}
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Blog
        </label>

        {/* Here, e is actually the new value of the editor (a string), not an event object. So, trying to access e.target.value will result in an error since e is already the value, not an event. */}
        <MDEditor
          value={pitch}
          onChange={(e) => setPitch(e)}
          id="pitch"
          preview="edit"
          height={300}
          style={{overflow: "hidden"}}
          textareaProps={{
            placeholder: "Briefly describe your idea/problem with solutions",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          className="mt-3"
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
