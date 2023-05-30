import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HyButton } from "../../..";

type THyModal = {
  buttonName: any;
  children: any;
  isOpen: boolean;
  openModal: (event: any) => void;
  closeModal: () => void;
  classes?: any;
  bgColorButton?: string;
  withIcon?: boolean;
};

export const HyModal = (props: THyModal) => {
  const {
    buttonName,
    children,
    isOpen,
    openModal,
    closeModal,
    classes,
    bgColorButton,
    withIcon,
  } = props;

  return (
    <>
      <div className={`flex items-center justify-center ${classes}`}>
        <HyButton
          onClick={openModal}
          variant={bgColorButton}
          withIcon={withIcon}
        >
          {buttonName}
        </HyButton>
      </div>

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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {buttonName}
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
