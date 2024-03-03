import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import BloodPressure from '@/Components/BloodPressure';

export default function Index({ auth, bloodPressures }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        'date_blood_pressure': new Date(),
        'systemic_blood_pressure': '',
        'diastolic_blood_pressure': '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('bloodPressures.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Blood Pressure Control" />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="py-2">
                                    <label htmlFor="date_blood_pressure" className="block text-sm font-medium text-gray-700">Blood Pressure Record Date</label>
                                    <input
                                        value={data.date_blood_pressure}
                                        type="date"
                                        id="date_blood_pressure"
                                        name="date_blood_pressure"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={e => setData('date_blood_pressure', e.target.value)}
                                    />
                                    <InputError message={errors.date_blood_pressure} className='mt-2' />
                                </td>
                                <td className="py-2">
                                    <label htmlFor="systemic_blood_pressure" className="block text-sm font-medium text-gray-700">Systemic Blood Pressure (PAS)</label>
                                    <input
                                        value={data.systemic_blood_pressure}
                                        type="number"
                                        id="systemic_blood_pressure"
                                        name="systemic_blood_pressure"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={e => setData('systemic_blood_pressure', e.target.value)}
                                    />
                                    <InputError message={errors.systemic_blood_pressure} className='mt-2' />
                                </td>
                                <td className="py-2">
                                    <label htmlFor="diastolic_blood_pressure" className="block text-sm font-medium text-gray-700">Diastolic Blood Pressure (PAD)</label>
                                    <input
                                        value={data.diastolic_blood_pressure}
                                        type="number"
                                        id="diastolic_blood_pressure"
                                        name="diastolic_blood_pressure"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        onChange={e => setData('diastolic_blood_pressure', e.target.value)}
                                    />
                                    <InputError message={errors.diastolic_blood_pressure} className='mt-2'/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="py-2 text-right">
                                    <PrimaryButton type="submit" className="mt-4" disabled={processing}>Submit</PrimaryButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Systemic Blood Pressure (PAS)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diastolic Blood Pressure (PAD)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bloodPressures.map(bloodPressure =>
                                <BloodPressure key={bloodPressure.id} bloodPressure={bloodPressure} />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
