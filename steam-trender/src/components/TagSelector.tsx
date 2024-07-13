import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { observer } from "mobx-react";
import TagStore from "../stores/TagStore";

interface SelectOption {
    value: number;
    label: string;
}

interface TagsSelectorProps {
    onChange: (selectedTagIds: number[]) => void;
    placeholder: string;
    limit: number;
}

const TagSelector = observer(
    ({ onChange, placeholder, limit }: TagsSelectorProps) => {
        const [selectedTags, setSelectedTags] = useState<
            MultiValue<SelectOption>
        >([]);

        const handleChange = (selectedOption: MultiValue<SelectOption>) => {
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

        const selectOptions: SelectOption[] = TagStore.tags.map((tag) => ({
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
            />
        );
    }
);

export default TagSelector;
