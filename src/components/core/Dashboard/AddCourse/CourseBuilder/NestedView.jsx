import React, { useState } from 'react'
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'

const NestedView = () => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    return (
        <div className='text-white'>
            hello

            <div>
                {
                    console.log('course?.courseContent = ',course?.courseContent)
                }
                {
                    course?.courseContent?.map((section) => {
                        {
                            console.log("section inside map function = ", section);
                        }
                        <details key={section._id} open>

                            <summary>
                                <div>
                                    <RxDropdownMenu />
                                    <p>{section?.sectionName}</p>
                                </div>
                            </summary>

                        </details>
                    })
                }
            </div>

        </div>
    )
}

export default NestedView