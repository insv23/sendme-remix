import { Form } from "@remix-run/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface NoteCardMenuProps {
  noteId: string;
}

export function NoteCardMenu({ noteId }: NoteCardMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <svg
          className="h-5 w-5 text-gray-400 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 13C5.10457 13 6 12.1046 6 11C6 9.89543 5.10457 9 4 9C2.89543 9 2 9.89543 2 11C2 12.1046 2.89543 13 4 13Z"
            fill="currentColor"
          />
          <path
            d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
            fill="currentColor"
          />
          <path
            d="M20 13C21.1046 13 22 12.1046 22 11C22 9.89543 21.1046 9 20 9C18.8954 9 18 9.89543 18 11C18 12.1046 18.8954 13 20 13Z"
            fill="currentColor"
          />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[80px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            编辑
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Form method="post" action={`/notes/${noteId}/delete`}>
              <button
                type="submit"
                className="w-full flex gap-2 items-center text-red-600 dark:text-red-500"
              >
                <svg
                  className="h-4 w-4 text-red-600 dark:text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                删除
              </button>
            </Form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
