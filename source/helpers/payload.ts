type PayloadStatus = "error" | "success" | null;

type ResponseError =
    "Unauthorized Access" |
    "Internal Server Error" |
    "Authenticated Error" |
    "Invalid Credentials" |
    "Not Found";

type PayloadData<T> = ResponseError | T | null;

export default function payload<T>(status: PayloadStatus, data: PayloadData<T> = null) {
    return { status, data };
}

