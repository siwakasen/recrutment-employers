<?php

namespace App\Http\Requests;

use App\Models\Applicant;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'applicant_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(Applicant::class)->ignore($this->user()->applicant_id, 'applicant_id'),
            ],
            'address' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:15'],
            'portfolio' => ['nullable', 'string', 'url'], // Assuming this is a URL
            'gender' => ['nullable', 'in:man,woman'], // Add acceptable values
            'education' => ['nullable', 'string', 'max:255'],
            'work_experience' => ['nullable', 'integer', 'max:255'],
            'curriculum_vitae' => ['nullable', 'file'], // If uploading a file
        ];
    }
}
