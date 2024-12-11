import ImageUpload from "@/components/custom/image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-5xl font-semibold">Upload Proof</h1>
      <p className="text-muted-foreground">Send Mobile Money To 0552515809</p>
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow" variant="outline">
              File upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Upload your files
              </DialogTitle>
              <DialogDescription className="text-center">
                The only file upload you will ever need
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <ImageUpload />
            </div>
          </DialogContent>
        </Dialog>
        <Link className="flex gap-1 items-center" href="https://wa.link/077n92">
          WhatsApp
          <MoveRight size={15} />
        </Link>
      </div>
    </main>
  );
}