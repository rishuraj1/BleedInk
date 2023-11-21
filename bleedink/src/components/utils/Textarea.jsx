import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../../conf";
import { useTheme } from "../../contexts/themeContext";

const Textarea = ({ name, control, label, defaultValue = "" }) => {
  const { theme } = useTheme();
  // console.log(theme);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className="text-slate-700 dark:text-slate-400 text-sm font-medium"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, ref } }) => (
          <Editor
            value={value}
            apiKey={conf.tinymceKey}
            onInit={(evt, editor) => (ref.current = editor)}
            initialValue={defaultValue}
            menubar={true}
            init={{
              height: 500,
              menubar: true,
              plugins:
                "lists advlist code autosave help image imagetools link media table wordcount visualblocks  code codesample fullscreen spellchecker emoticons fullpage",
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify code emoticons image imagetools link | spellchecker bullist numlist outdent indent fullpage | " +
                "removeformat | help",
              spellchecker_rpc_url: "spellchecker.php",
              spellchecker_language: "en",
              spellchecker_dialog: true,
              spellchecker_whitelist: ["Ephialtes", "bleedink"],
              spellchecker_languages: "English=en",
            }}
            onEditorChange={(content) => onChange(content)}
          />
        )}
      />
    </div>
  );
};

export default Textarea;
