import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import diabetesImage from "../../assets/image.jpg";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDetailsForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    formData.MentHlth = parseInt(formData.MentHlth) * 6;
    formData.PhysHlth = parseInt(formData.PhysHlth) * 6;
    console.log(formData);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/predict`,
        formData
      );
      console.log(data);
      if (data.prediction) {
        navigate("/positive");
      }
      if (!data.prediction) {
        navigate("/nagetive");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onReset = () => {
    reset();
  };

  const descriptions = {
    GenHlth: [
      { value: "5", label: "Excellent" },
      { value: "4", label: "Very Good" },
      { value: "3", label: "Good" },
      { value: "2", label: "Fair" },
      { value: "1", label: "Poor" },
    ],
    Education: [
      { value: "1", label: "Never attended school or only kindergarten" },
      { value: "2", label: "Grades 1 through 8" },
      { value: "3", label: "Grades 9 through 11" },
      { value: "4", label: "Grade 12 or GED" },
      { value: "5", label: "Some college or technical school" },
      { value: "6", label: "College 4 years or more" },
    ],
    Income: [
      { value: "1", label: "< $10,000" },
      { value: "2", label: "$10,000 to < $15,000" },
      { value: "3", label: "$15,000 to < $20,000" },
      { value: "4", label: "$20,000 to < $25,000" },
      { value: "5", label: "$25,000 to < $35,000" },
      { value: "6", label: "$35,000 to < $50,000" },
      { value: "7", label: "$50,000 to < $75,000" },
      { value: "8", label: "$75,000 or more" },
    ],
    Age: [
      { value: "1", label: "18-24" },
      { value: "2", label: "25-29" },
      { value: "3", label: "30-34" },
      { value: "4", label: "35-39" },
      { value: "5", label: "40-44" },
      { value: "6", label: "45-49" },
      { value: "7", label: "50-54" },
      { value: "8", label: "55-59" },
      { value: "9", label: "60-64" },
      { value: "10", label: "65-69" },
      { value: "11", label: "70-74" },
      { value: "12", label: "75-79" },
      { value: "13", label: "80 or older" },
    ],
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute inset-0 z-0">
        <img
          src={diabetesImage}
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-xl p-10 shadow-2xl max-w-7xl w-full mx-4 my-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Diabetes Risk Assessment
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Know Your Risk, Take Control – Predict Diabetes Before It Strikes!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              label: "Do you have high blood pressure?*",
              name: "HighBP",
              required: true,
            },
            {
              label: "Do you have high cholesterol?*",
              name: "HighChol",
              required: true,
            },
            {
              label:
                "Have you had your cholesterol checked in the past 5 years?*",
              name: "CholCheck",
              required: true,
            },
            {
              label:
                "Have you smoked at least 100 cigarettes in your lifetime?*",
              name: "Smoker",
              required: true,
            },
            {
              label: "Have you ever had a stroke?*",
              name: "Stroke",
              required: true,
            },
            {
              label: "Have you had heart disease or a heart attack?*",
              name: "HeartDiseaseorAttack",
              required: true,
            },
            {
              label:
                "Have you done any physical activity in the past 30 days?*",
              name: "PhysActivity",
              required: true,
            },
            {
              label: "Do you eat fruits at least once per day?*",
              name: "Fruits",
              required: true,
            },
            {
              label: "Do you eat vegetables at least once per day?*",
              name: "Veggies",
              required: true,
            },
            {
              label:
                "Do you consume alcohol heavily (more than 14 drinks/week for men, 7 for women)?*",
              name: "HvyAlcoholConsump",
              required: true,
            },
            {
              label: "Do you have any form of healthcare coverage?*",
              name: "AnyHealthcare",
              required: true,
            },
            {
              label:
                "In the past year, was there a time you couldn't see a doctor because of cost?*",
              name: "NoDocbcCost",
              required: true,
            },
            {
              label:
                "Do you have serious difficulty walking or climbing stairs?*",
              name: "DiffWalk",
              required: true,
            },
            {
              label: "What is your gender?*",
              name: "Sex",
              options: ["Male", "Female"],
              required: true,
            },
          ].map(({ label, name, options, required }) => (
            <div key={name}>
              <FormLabel>{label}</FormLabel>
              <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={{ required: `This field is required` }}
                render={({ field }) => (
                  <RadioGroup
                    row
                    {...field}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label={options ? options[0] : "Yes"}
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label={options ? options[1] : "No"}
                    />
                  </RadioGroup>
                )}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]?.message}</p>
              )}
            </div>
          ))}

          <div>
            <FormLabel>What is your Body Mass Index (BMI)?</FormLabel>
            <Controller
              name="BMI"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required",
                min: { value: 10, message: "BMI must be at least 10" },
                max: { value: 50, message: "BMI must not exceed 50" },
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Please enter a valid BMI",
                },
              }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="BMI"
                  {...field}
                  error={!!errors.BMI}
                  helperText={errors.BMI ? errors.BMI.message : ""}
                />
              )}
            />
          </div>

          <div>
            <FormLabel>How would you rate your general health?</FormLabel>
            <Controller
              name="GenHlth"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {descriptions.GenHlth.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={`${label}`}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.GenHlth && (
              <p className="text-red-500 text-sm">{errors.GenHlth?.message}</p>
            )}
          </div>

          <div>
            <FormLabel>How would you rate your mental health?</FormLabel>
            <Controller
              name="MentHlth"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {descriptions.GenHlth.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={`${label}`}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.MentHlth && (
              <p className="text-red-500 text-sm">{errors.MentHlth?.message}</p>
            )}
          </div>

          <div>
            <FormLabel>How would you rate your physical health?</FormLabel>
            <Controller
              name="PhysHlth"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {descriptions.GenHlth.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={`${label}`}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.PhysHlth && (
              <p className="text-red-500 text-sm">{errors.PhysHlth?.message}</p>
            )}
          </div>

          <div>
            <FormLabel>What is your highest level of education?</FormLabel>
            <Controller
              name="Education"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {descriptions.Education.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={`${label}`}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.Education && (
              <p className="text-red-500 text-sm">
                {errors.Education?.message}
              </p>
            )}
          </div>

          <div>
            <FormLabel>What is your income level?</FormLabel>
            <Controller
              name="Income"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {descriptions.Income.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={`${label}`}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.Income && (
              <p className="text-red-500 text-sm">{errors.Income?.message}</p>
            )}
          </div>

          <div>
            <FormLabel>What is your age category?</FormLabel>
            <Controller
              name="Age"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required  " }}
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {descriptions.Age.map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={`${label}`}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.Age && (
              <p className="text-red-500 text-sm">{errors.Age?.message}</p>
            )}
          </div>

          <div className="col-span-full flex justify-center gap-4">
            <button
              onClick={() => {
                console.log("called");
              }}
              type="submit"
              className="bg-indigo-600 text-white py-2 px-8 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onReset}
              className="bg-gray-400 text-white py-2 px-8 rounded-lg hover:bg-gray-500 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserDetailsForm;
