import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { ITag } from "../models/tag";
import ApiService from "../api/service";

interface SelectOption {
    value: number;
    label: string;
}

interface TagsSelectorProps {
    onChange: (selectedTagIds: number[]) => void;
    placeholder: string;
}

export function TagSelector({ onChange, placeholder }: TagsSelectorProps) {
    const [tags, setTags] = useState<ITag[]>([]);
    const [selectedTags, setSelectedTags] = useState<MultiValue<SelectOption>>(
        []
    );

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await ApiService.fetchTags();
                setTags(response);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        onChange(selectedTags.map((tag) => tag.value));
    }, [selectedTags, onChange]);

    const selectOptions: SelectOption[] = tags.map((tag) => ({
        value: tag.id,
        label: tag.title,
    }));

    return (
        <Select
            options={selectOptions}
            isMulti
            value={selectedTags}
            onChange={(
                selectedOption: MultiValue<SelectOption>
            ) => setSelectedTags(selectedOption)}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value.toString()}
            placeholder={placeholder}
        />
    );
}
