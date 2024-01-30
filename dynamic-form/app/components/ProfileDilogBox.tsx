import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const ProfileDilogBox = ({ setModalopen }: any) => {
  const {
    question,
    setAnswerType,
    answerType,
    setQuestion,
    isOpen,
    closeModal,
    addQuestion,
    setChoices,
    choices,
    setIsQuestionRequired,
    isQuestionRequired,
  } = setModalopen;

  const isSubmitDisabled = question.trim() === "";

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
                    <form>
                      <div className="w-full max-w-md space-y-8">
                        <div>
                          <h2 className="!mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Add Question
                          </h2>
                        </div>
                        <div className="mt-6px">
                          <label className="block mt-3 ">Question:</label>
                          <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="mt-3 p-2 border border-gray-300 rounded"
                            placeholder="Enter Your question"
                            required
                          />
                        </div>
                        <div className="mt-6px">
                          <label className="block mb-4">Answer Type:</label>
                          <select
                            value={answerType}
                            onChange={(e) => setAnswerType(e.target.value)}
                            className=" p-2 border border-gray-300 rounded w-[265px] mt[10px]"
                          >
                            <option value="Text">Text</option>
                            <option value="Multichoice Checkbox">
                              Multichoice Checkbox
                            </option>
                            <option value="Single Select radio">
                              Single Select radio
                            </option>
                          </select>
                        </div>
                        <div className="mt-6px">
                          {answerType === "Multichoice Checkbox" && (
                            <div>
                              <label className="block mb-4">
                                Choices (one per line):
                              </label>
                              <textarea
                                value={choices}
                                onChange={(e) => setChoices(e.target.value)}
                                className="border border-gray-300 rounded p-2 w-[265px]"
                              />
                              <br />
                            </div>
                          )}
                        </div>
                        <div className="mt-6px">
                          {answerType === "Single Select radio" && (
                            <div>
                              <label className="block mb-4">
                                Choices (one per line):
                              </label>
                              <textarea
                                value={choices}
                                onChange={(e) => setChoices(e.target.value)}
                                className="border border-gray-300 rounded p-2 w-[265px]"
                              />
                              <br />
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-10px mb-4">
                            <input
                              type="checkbox"
                              checked={isQuestionRequired}
                              onChange={() =>
                                setIsQuestionRequired(!isQuestionRequired)
                              }
                              className="mr-2"
                            />
                            Required ?
                          </label>
                          <button
                            type="submit"
                            onClick={addQuestion}
                            disabled={isSubmitDisabled}
                            className={`group relative flex w-full justify-center rounded-lg border ${
                              isSubmitDisabled
                                ? "bg-gray-800 cursor-not-allowed"
                                : "bg-black"
                            } text-white py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-black"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
