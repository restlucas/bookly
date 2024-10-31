// "use client";

// import { Calendar } from "@/components/calendar";
// import { SelectInput } from "@/components/input/select";
// import { TextInput } from "@/components/input/text";
// import Modal from "@/components/modal";
// import { useState } from "react";

// export function Availability() {
//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     console.log(e);
//   }

//   return (
//     <>
//       {/* Modal */}
//       <Modal
//         title="Finalizar agendamento"
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       >
//         <h5 className="mb-4">Revise as informações selecionadas</h5>

//         <TextInput
//           name="serviceProfessionalName"
//           label="Profissional"
//           readOnly={true}
//           value="Metro Boomin"
//         />
//         <TextInput
//           name="serviceDate"
//           label="Data"
//           readOnly={true}
//           value="29/06/2024"
//         />
//         <TextInput
//           name="serviceValue"
//           label="Valor"
//           readOnly={true}
//           value="R$200,00"
//         />
//         {/* <SelectInput
//           label="Tipo de atendimento"
//           name="serviceType"
//           value=""
//           onChange={(e) => handleChange(e)}
//         /> */}

// <div className="mt-6 flex items-center justify-start gap-4">
//   <button
//     onClick={() => setIsModalOpen(false)}
//     className="hover: rounded-md bg-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-vibrant-green-200"
//   >
//     Solicitar agendamento
//   </button>
//   <button
//     onClick={() => setIsModalOpen(false)}
//     className="hover: rounded-md border-2 border-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-background-300"
//   >
//     Cancelar
//   </button>
//         </div>
//       </Modal>
//     </>
//   );
// }
