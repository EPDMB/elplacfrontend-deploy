// useFairSelection.ts
import { useState, useEffect } from "react";
import { useFair } from "@/context/FairProvider";
import { useProfile } from "@/context/ProfileProvider";
import { Category, DropdownOption, FairCategories, IFair } from "@/types";

const useFairSelection = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [categoriesArray, setCategoriesArray] = useState<FairCategories[] | null>(
    null
  );
  const [selectedOptionCategory, setSelectedOptionCategory] = useState<
    string | null
  >(null);
  const [openModal, setOpenModal] = useState(false);
  const { fairs } = useFair();

  useEffect(() => {
    if (selectedOption) {
      const fairSelectedPerUser = fairs.find((f) => f.name === selectedOption);
      console.log(fairSelectedPerUser)
      if (fairSelectedPerUser) {
        setCategoriesArray(fairSelectedPerUser?.fairCategories);
        console.log(fairSelectedPerUser?.fairCategories)
      }
    } else {
      setCategoriesArray(null);
    }
  }, [selectedOption, fairs]);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option.name);
  };

  const handleSelectCategory = (option: { id: string; name: string }) => {
    console.log(option)
    setSelectedOptionCategory(option.name);
  };

  console.log(categoriesArray)
  console.log(selectedOptionCategory)

  return {
    selectedOption,
    categoriesArray,
    selectedOptionCategory,
    openModal,
    setSelectedOption,
    setSelectedOptionCategory,
    setOpenModal,
    handleSelect,
    handleSelectCategory,
  };
};

export default useFairSelection;
