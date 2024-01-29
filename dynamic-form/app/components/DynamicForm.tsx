"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProfileDilogBox from "./AddQuestions";
import { API_ROUTE, ROUTE } from "../constant";
import { Question } from "../interface";

const DynamicForm = () => {
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState("Text");
  const [choices, setChoices] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [isQuestionRequired, setIsQuestionRequired] = useState(false);

  const router = useRouter();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: question,
        answerType,
        choices: choices.split("\n"),
        isRequired: isQuestionRequired,
      },
    ]);
    setQuestion("");
    setAnswerType("Text");
    setChoices("");
    setIsOpen(false);
    setIsQuestionRequired(false);
  };

  const saveForm = async () => {
    try {
      const response = await axios.post(API_ROUTE.CREATE_FORM, {
        formName,
        questions,
      });
      if (response && response.data) {
        router.push(`/${response.data.formURL}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formListing = () => {
    router.push(ROUTE.FORM_LIST);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto text-center ">
        <h1 className="text-center text-3xl font-bold mb-4 pt-12 pb-9">
          Dynamic Form Builder
        </h1>
        <label className="block mb-4">
          Form Name:
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="ml-2 p-2 border border-gray-300 rounded"
          />
        </label>
        <br />

        <button
          onClick={openModal}
          className="bg-green-500 text-white p-2 m-2 cursor-pointer"
        >
          Add Question
        </button>
        {/* <label className="block mb-4">
          Is Required:
          <input
            type="checkbox"
            checked={isQuestionRequired}
            onChange={() => setIsQuestionRequired(!isQuestionRequired)}
            className="ml-2"
          />
        </label> */}
        <button
          onClick={saveForm}
          className="bg-blue-500 text-white p-2 m-2 cursor-pointer"
          disabled={!questions.length}
        >
          Save Form
        </button>
        <button
          onClick={formListing}
          className="bg-blue-500 text-white p-2 m-2 cursor-pointer"
        >
          Form Listing
        </button>

        {questions.length ? (
          <>
            <hr className="my-4" />
            <h2 className="text-2xl font-bold mb-2">Form Preview</h2>
            <ul>
              {questions.map((q: Question, index: number) => (
                <li key={index}>
                  {q.title} - {q.answerType}-
                  {q.isRequired ? "Required" : "Optional"}
                  {q.choices && (
                    <ul>
                      {q.choices.map((choice: string, i: number) => (
                        <li key={i}>{choice}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          ""
        )}
      </div>
      <ProfileDilogBox
        setModalopen={{
          question,
          setQuestion,
          isOpen,
          closeModal,
          addQuestion,
          answerType,
          setAnswerType,
          choices,
          setChoices,
          setIsQuestionRequired,
          isQuestionRequired,
        }}
      />
    </>
  );
};

export default DynamicForm;
