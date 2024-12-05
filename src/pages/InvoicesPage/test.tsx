// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Check, ChevronsUpDownIcon } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// const Testpage = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[200px] justify-between"
//         >
//           {/* {product.name && productsData
//             ? productsData.find((item) => item.id === product.id)?.name
//             : "Chọn sản phẩm"} */}
//           Chọn sản phẩm
//           <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent>
//         <Command>
//           <CommandInput placeholder="Tìm sản phẩm..." />
//           <CommandList>
//             <CommandEmpty> Không tìm thấy sản phẩm</CommandEmpty>
//             <CommandGroup>
//               {/* {productsData?.map((item) => (
//                           <CommandItem
//                           key={item.id}
//                           onSelect={() => {
//                             handleUpdateProduct(product.id, {
//                               id: item.id,
//                               name: item.name,
//                             });
//                             setOpen(false);
//                           }}
//                           >
//                             <Check
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 product.name === item.name
//                                   ? "opacity-100"
//                                   : "opacity-0"
//                               )}
//                             />
//                             đasa
//                           </CommandItem>
//                         ))} */}
//               <CommandItem>test</CommandItem>
//               <CommandItem>test2</CommandItem>
//               <CommandItem>test3</CommandItem>
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default Testpage;
