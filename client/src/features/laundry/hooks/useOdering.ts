import {useState,useEffect} from 'react'
import Type from '../../../assets/ts/medicine-type';
import Category from '../../../assets/ts/medicine-category';
import { useStockControl } from './useStockControl';
import { useImageUpload } from '../../user-signup/hooks/useImageUpload';
import medicineInventory from '../../../assets/ts/medicine-inventory';
export const useOrdering=(medicine:medicineInventory)=>{
  // (pharmacyManager !== cartManager &&
  //   cartManager !== "") ||
  // (!prescriptionImage && prescription===true ) ||
  // quantityPcs + quantityStrips + quantityBoxes === 0
  const [medicineName,setMedicineName]=useState<string>(medicine.medicineName);
  const [genericName,setGenericName]=useState<string>(medicine.genericName);
  const [medicineType,setMedicineType]=useState<Type>(medicine.Type);
  const [manufacturer,setManufacturer]=useState<string>(medicine.manufacturer);
  const [description,setDescription]=useState<string>(medicine.description);
  const [medicineCategory,setMedicineCategory]=useState<Category>(medicine.Category);
  const [isLoading,setIsLoading]=useState<boolean>(false);
  const [isDisabled,setIsDisabled]=useState<boolean>(false);
  const [error,setError]=useState<string>("");
  const [prescription,setPrescription]=useState<boolean|undefined>(medicine.prescription);
  const {imageURL,setImage,upload_image}=useImageUpload("");
  const {quantityPcs,setQuantityPcs,quantityBoxes,setQuantityBoxes,quantityStrips,setQuantityStrips,currentPcs,currentStrips,currentBoxes,pcsPerStrip,setPcsPerStrip,pcsPerBox,setPcsPerBox,stripsPerBox,setStripsPerBox,sellingPrice,setsellingPrice,calculateTotalPrice}=useStockControl(medicine.amount.pcs,medicine.amount.strips,medicine.amount.boxes);

  return {medicineName,genericName,description,medicineImage:medicine.imageURL,imageURL,setImage,manufacturer,medicineType,medicineCategory,prescription,isLoading,isDisabled,error,setError,stockControl:{quantityPcs,setQuantityPcs,quantityBoxes,setQuantityBoxes,quantityStrips,setQuantityStrips,currentPcs,currentStrips,currentBoxes,sellingPrice,calculateTotalPrice}};
}