import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { ObjectId } from "mongodb";
import type {
    PATCH_UpdateStockCount,
    POST_CreateBookBody,
} from "../../types/api";
import type { Book } from "../../types/book";
import { BooksService } from "./books.service";

@Controller("books")
export class BooksController {
    constructor(private readonly bookService: BooksService) {}

    @Get("/")
    async getAllBooks(): Promise<Book[]> {
        return await this.bookService.getBooks();
    }

    @Get("/id")
    async getBooksById(@Query("ids") idString: string): Promise<Book[]> {
        const bookIds: ObjectId[] = idString
            .split(",")
            .map((id) => new ObjectId(id));
        return await this.bookService.getBooksById(bookIds);
    }

    @Post("/")
    async createBooks(@Body() { books }: POST_CreateBookBody): Promise<Book[]> {
        const booksWithoutId = books.map((book) => {
            delete book._id;
            return book;
        });
        return await this.bookService.createBooks(booksWithoutId);
    }

    @Patch("/stock")
    async updateStockCount(
        @Body() { books }: PATCH_UpdateStockCount,
    ): Promise<Book[]> {
        return await this.bookService.updateStock(books);
    }
}