<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // CREATE
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'type' => 'required|string',
            'company' => 'nullable|string',
            'program' => 'nullable|string',
            'message_en' => 'nullable|string',
            'message_am' => 'nullable|string',
            'message_or' => 'nullable|string',
        ]);

        $message = ContactMessage::create($data);

        return response()->json($message, 201);
    }

    // READ ALL
    public function index(Request $request)
    {
        $lang = $request->query('lang', 'en');

        return ContactMessage::latest()->get()->map(function ($m) use ($lang) {
            return [
                'id' => $m->id,
                'name' => $m->name,
                'email' => $m->email,
                'type' => $m->type,
                'company' => $m->company,
                'program' => $m->program,
                'message' => $m->{"message_$lang"},
                'created_at' => $m->created_at,
            ];
        });
    }

    // READ ONE
    public function show($id)
    {
        return ContactMessage::findOrFail($id);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $contact = ContactMessage::findOrFail($id);

        $contact->update($request->only([
            'name',
            'email',
            'type',
            'company',
            'program',
            'message_en',
            'message_am',
            'message_or',
        ]));

        return response()->json($contact);
    }

    // DELETE
    public function destroy($id)
    {
        ContactMessage::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
