import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

import Modal from '@/Components/Modal';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function BloodPressure({ bloodPressure }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        date_blood_pressure: bloodPressure.date_blood_pressure,
        systemic_blood_pressure: bloodPressure.systemic_blood_pressure,
        diastolic_blood_pressure: bloodPressure.diastolic_blood_pressure
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('bloodPressures.update', bloodPressure.id), { onSuccess: () => setIsModalOpen(false) });
    }

    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">{dayjs(bloodPressure.date_blood_pressure).format('DD/MM/YYYY')}, {dayjs(bloodPressure.created_at).format('HH:mm:ss')}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bloodPressure.systemic_blood_pressure}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bloodPressure.diastolic_blood_pressure}</td>
                <td className='px-6 py-4 whitespace-nowrap'>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setIsModalOpen(true)}>
                                Edit
                            </button>
                            <Dropdown.Link as="button" href={route('bloodPressures.destroy', bloodPressure.id)} method="delete">
                                Delete
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </td>
            </tr>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={submit}>
                <div className="p-6">
                        <div className="mb-4">
                            <label htmlFor="date_blood_pressure" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                            <input
                                value={data.date_blood_pressure}
                                type="date"
                                id="date_blood_pressure"
                                name="date_blood_pressure"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('date_blood_pressure', e.target.value)}
                            />
                            <InputError message={errors.date_blood_pressure} className='mt-2' />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="systemic_blood_pressure" className="block text-gray-700 text-sm font-bold mb-2">Systemic Blood Pressure</label>
                            <input
                                value={data.systemic_blood_pressure}
                                type="number"
                                id="systemic_blood_pressure"
                                name="systemic_blood_pressure"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('systemic_blood_pressure', e.target.value)}
                            />
                            <InputError message={errors.systemic_blood_pressure} className='mt-2' />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="diastolic_blood_pressure" className="block text-gray-700 text-sm font-bold mb-2">Diastolic Blood Pressure</label>
                            <input
                                value={data.diastolic_blood_pressure}
                                type="number"
                                id="diastolic_blood_pressure"
                                name="diastolic_blood_pressure"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('diastolic_blood_pressure', e.target.value)}
                            />
                            <InputError message={errors.diastolic_blood_pressure} className='mt-2' />
                        </div>

                        <div className="flex flex-row space-x-4 mt-4">
                            <PrimaryButton className="flex-grow">Save</PrimaryButton>
                            <button className="flex-grow bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => { setIsModalOpen(false); reset(); clearErrors(); }}>Cancel</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
