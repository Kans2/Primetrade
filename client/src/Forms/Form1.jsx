import React from "react";

///cutom form
import { useState } from "react";
function useForm(initialValue){

    const [value, setValue] = useState(0);

    function onChange (e){
          e.taget.value;
    } 

    function reset(){
        setValue(initialValue);
    }

    return [ value , onChange , reset];
}