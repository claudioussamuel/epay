'use client'
import React, { useState } from 'react'

export default function Upload() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) return

        try {
            const data = new FormData()
            data.set('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })
            // handle the error
            if (!res.ok) throw new Error(await res.text())
        } catch (error: any) {
            console.error(error)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPreview(fileReader.result as string);
            };
            fileReader.readAsDataURL(selectedFile);
        }
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center mb-6">Upload Your File</h2>
                <div className="flex flex-col items-center mb-4">
                    <input 
                        type='file'
                        name='file'
                        onChange={handleFileChange}
                        className="mb-4 border border-gray-300 rounded-lg p-2 w-full cursor-pointer hover:border-blue-500 transition"
                    />
                    {preview && (
                        <img src={preview} alt="Preview" className="mb-4 w-full h-auto object-cover rounded-lg shadow-md" />
                    )}
                </div>
                <input 
                    type='submit' 
                    value='Upload' 
                    className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition duration-200 w-full"
                />
            </form>
        </main>
    )
}