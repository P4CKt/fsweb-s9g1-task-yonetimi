import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import {useForm} from "react-hook-form";

export default function TaskHookForm(props) {
  const { kisiler, submitFn }= props;
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm( {mode:"onChange"});
  let peopleClone=watch("people");
  function handleMySubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    }
    
    )
    console.log(data)
    console.log(props.tasks)
    console.log(peopleClone)
  
  }
 

  return (
    
    <form className="taskForm" onSubmit={handleSubmit(handleMySubmit)}>
    <div className="form-line">
      <label className="input-label" htmlFor="title">
        Başlık
      </label>
      <input
        className="input-text"
        id="title"
        
        type="text"
       {...register("title",{
        required:"Task başlığı yazmalısınız",
        minLength:{value: 3, message:"Task başlığı en az 3 karakter olmalı"}})}
      />
     { errors.title&& <p className="input-error">{errors.title.message}</p>}
    </div>

    <div className="form-line">
      <label className="input-label" htmlFor="description">
        Açıklama
      </label>
      <textarea
        className="input-textarea"
        rows="3"
        id="description"
        {...register("description",{required:"Task açıklaması yazmalısınız",
          minLength:{value:10, message:"Task açıklaması en az 10 karakter olmalı"}})}
      ></textarea>
     { errors.description&& <p className="input-error">{errors.description.message}</p>}
    </div>

    <div className="form-line">
      <label className="input-label">İnsanlar</label>
      <div>
        {kisiler.map((p) => (
          <label className="input-checkbox" key={p}>
            <input
              type="checkbox"
              id=""
              name="people"
              
              value={p} 
              
              {...register("people",{
                min:{value:1, message:"Lütfen en az bir kişi seçin"},
              max:{value:3, message:"En fazla 3 kişi seçebilirsiniz"}})}
            />{p}
           
            { errors.people&& <p className="input-error">{errors.people.message}</p>}
          </label>
        
        ))}
      </div>
      <p className="input-error"></p>
    </div>

    <div className="form-line">
      <button
        className="submit-button"
        type="submit"
        disabled={!isValid}
    
      >
        Kaydet
      </button>
    </div>
  </form>
  )
}
