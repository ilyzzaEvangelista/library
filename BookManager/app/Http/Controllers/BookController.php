<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();  // Read all books from the database
        return response()->json($books);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image',
        ]);

        $book = new Book();
        $book->title = $validated['title'];
        $book->author = $validated['author'];
        $book->description = $validated['description'];

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $book->image = $imagePath;
        }

        $book->save();
        return response()->json($book, 201);  // Return created book
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);  // Find a single book by ID
        return response()->json($book);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image',
        ]);

        $book = Book::findOrFail($id);
        $book->title = $validated['title'];
        $book->author = $validated['author'];
        $book->description = $validated['description'];

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $book->image = $imagePath;
        }

        $book->save();
        return response()->json($book);  // Return updated book
    }

    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();  // Delete the book
        return response()->json(null, 204);  // Return no content status
    }
}
