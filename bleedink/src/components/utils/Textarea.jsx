import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const Textarea = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-slate-700 text-sm font-medium" htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, ref } }) => (
          <Editor
            apiKey="8u4pyettrrm0120jrza87yfdqg1ioqtcij6s0hszam4f5azm"
            onInit={(evt, editor) => (ref.current = editor)}
            initialValue={defaultValue}
            menubar={true}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount codesample image",
              ],
              toolbar:
                "undo redo | formatselect | image | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content) => onChange(content)}
          />
        )}
      />
    </div>
  );
};

export default Textarea;
