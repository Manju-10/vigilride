import { useState, useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface ProfileAvatarProps {
  name: string;
  onImageChange?: (imageUrl: string) => void;
}

const ProfileAvatar = ({ name, onImageChange }: ProfileAvatarProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved avatar from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("profileAvatar");
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, []);

  const getInitials = (fullName: string) => {
    return fullName.split(' ').map(n => n[0]).join('');
  };

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPreviewOpen(true);
  };

  const handleCameraClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUploadDialogOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmUpload = () => {
    if (previewUrl) {
      setAvatarUrl(previewUrl);
      localStorage.setItem("profileAvatar", previewUrl);
      onImageChange?.(previewUrl);
      toast.success("Profile photo updated successfully");
      handleCloseUploadDialog();
    }
  };

  const handleCloseUploadDialog = () => {
    setIsUploadDialogOpen(false);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="relative mb-4">
        {/* Main Avatar - Click for Preview */}
        <Avatar 
          className="w-24 h-24 cursor-pointer transition-transform hover:scale-105"
          onClick={handleAvatarClick}
        >
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
          ) : null}
          <AvatarFallback className="bg-accent text-white text-3xl font-bold">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>

        {/* Camera Icon - Click for Upload */}
        <Button
          size="icon"
          className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-success hover:bg-success/90 text-foreground"
          onClick={handleCameraClick}
        >
          <Camera className="w-4 h-4" />
        </Button>
      </div>

      {/* Full-Size Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
          <div 
            className="relative flex items-center justify-center"
            onClick={() => setIsPreviewOpen(false)}
          >
            <div 
              className="relative bg-background rounded-full p-2 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar className="w-64 h-64 sm:w-80 sm:h-80">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-accent text-white text-6xl sm:text-7xl font-bold">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -top-2 -right-2 rounded-full w-8 h-8"
                onClick={() => setIsPreviewOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={handleCloseUploadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-accent" />
              Change Profile Photo
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Preview Area */}
            {previewUrl ? (
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={previewUrl} alt="Preview" className="object-cover" />
                </Avatar>
                <p className="text-sm text-muted-foreground">Preview of your new photo</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-8">
                <Avatar className="w-24 h-24 opacity-50">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
                  ) : null}
                  <AvatarFallback className="bg-muted text-muted-foreground text-2xl font-bold">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground text-center">
                  Select a photo to update your profile picture
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                onClick={triggerFileInput}
                variant="outline"
                className="w-full h-12"
              >
                <Camera className="w-4 h-4 mr-2" />
                {previewUrl ? "Choose Different Photo" : "Choose Photo"}
              </Button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleCloseUploadDialog}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmUpload}
              disabled={!previewUrl}
              className="flex-1 bg-accent hover:bg-accent/90"
            >
              Save Photo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileAvatar;
