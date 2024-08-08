import React, { useState, useEffect } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";
import { observer } from "mobx-react";
import TagStore from "../stores/TagStore";

interface OptionType {
    label: string;
    value: number;
}

const selectStyle: StylesConfig<OptionType, true> = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? "#e9ecef" : "white",
        borderColor: state.isFocused ? "var(--bs-primary, #00000)" : "#ced4da",
        boxShadow: state.isFocused
            ? "0 0 0 0.2rem rgba(var(--bs-primary-rgb, 0, 123, 255), 0.25)"
            : "none",
        "&:hover": {
            borderColor: state.isFocused
                ? "var(--bs-primary, #00000)"
                : "#ced4da",
        },
        color: "black",
        minHeight: "calc(1.5em + 0.75rem + 2px)",
    }),
    menu: (provided) => ({
        ...provided,
        borderColor: "#ced4da",
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "white" : "black",
        backgroundColor: state.isSelected
            ? "var(--bs-primary, #007bff)"
            : state.isFocused
                ? "#f8f9fa"
                : undefined,
        "&:active": {
            backgroundColor: "var(--bs-primary-color, #007bff)",
            color: "white",
        },
    }),
};

interface TagsSelectorProps {
    onChange: (selectedTagIds: number[]) => void;
    placeholder: string;
    limit: number;
}

const TagSelector = observer(
    ({ onChange, placeholder, limit }: TagsSelectorProps) => {
        const [selectedTags, setSelectedTags] = useState<
            MultiValue<OptionType>
        >([]);

        const handleChange = (selectedOption: MultiValue<OptionType>) => {
            if (selectedOption.length <= limit) {
                setSelectedTags(selectedOption);
            } else {
                alert("You reached tags limit.");
            }
        };

        useEffect(() => {
            TagStore.fetchTags();
        }, []);

        useEffect(() => {
            onChange(selectedTags.map((tag) => tag.value));
        }, [selectedTags, onChange]);

        const selectOptions: OptionType[] = TagStore.tags.map((tag) => ({
            value: tag.id,
            label: tag.title,
        }));

        return (
            <Select
                options={selectOptions}
                isMulti
                value={selectedTags}
                onChange={handleChange}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value.toString()}
                placeholder={placeholder}
                styles={selectStyle}
            />
        );
    }
);

export default TagSelector;
