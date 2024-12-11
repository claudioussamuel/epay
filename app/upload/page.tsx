'use client'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';

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

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const selectedFile = acceptedFiles[0];
            if (selectedFile) {
                setFile(selectedFile);
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                    setPreview(fileReader.result as string);
                };
                fileReader.readAsDataURL(selectedFile);
            }
        }
    });

    return (
        <main className="flex justify-center items-center min-h-screen flex-col space-y-4">
                <h1 className="text-5xl font-semibold">Upload Proof</h1>
                <p className="text-muted-foreground">Send Mobile Money To 0552515809</p>
            <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg  max-w-md w-full">
         
                <div {...getRootProps()} className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mb-4">
                    <input {...getInputProps()} className="hidden" />
                    <div className="text-center">
                        <p className="mt-2 text-sm text-gray-600">
                            <span className="font-semibold">Drag files</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Click to upload files (files should be under 10 MB)
                        </p>
                    </div>
                </div>
                {preview && (
                    <img src={preview} alt="Preview" className="mb-4 w-full h-auto object-cover rounded-lg shadow-md" />
                )}
                <input 
                    type='submit' 
                    value='Upload' 
                    className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition duration-200 w-full"
                />
            </form>
        </main>
    )
}