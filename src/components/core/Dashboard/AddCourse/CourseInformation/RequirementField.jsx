import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {

    const [requirement, setRequirement] = useState('');
    const [requirementList, setRequirementList] = useState([]);
    const { editCourse,course } = useSelector((state) => state.course);

    useEffect(() => {
        if (editCourse) {
            setRequirementList(course?.instructions)
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList, setValue, name]);

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement('');
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirement = [...requirementList];
        updatedRequirement.splice(index, 1);
        setRequirementList(updatedRequirement);
    }

    return (
        <div>

            <label htmlFor={name} className='label-style text-richblack-5'>{label}<sup className='text-pink-200'>*</sup></label>
            <div>
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='form-style w-full'
                />

                <button
                    type='button'
                    onClick={handleAddRequirement}
                    className='font-semibold text-yellow-50'
                >
                    Add
                </button>
            </div>

            {
                requirementList.length > 0 && (
                    <ul>
                        {
                            requirementList.map((req, index) => (
                                <li key={index} className='flex items-center text-richblack-5'>
                                    <span>{req}</span>
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveRequirement(index)}
                                        className='text-sm text-pure-greys-300 ml-2'
                                    >
                                        clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {
                errors[name] && (
                    <span>
                        {label} is required
                    </span>
                )
            }

        </div>
    )
}

export default RequirementField