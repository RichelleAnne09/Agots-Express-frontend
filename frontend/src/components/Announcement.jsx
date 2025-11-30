import { Calendar, Edit, Megaphone, Plus, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { DashboardHeader } from "../ui/DashboardHeader";
import { DashboardSidebar } from "../ui/DashboardSidebar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Textarea } from "../ui/Textarea";

import {
  createAnnouncement,
  deleteAnnouncement,
  fetchAnnouncements,
  updateAnnouncement,
} from "../api/AnnouncementAPI";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const getTypeColor = (type) => {
    switch (type) {
      case "update":
        return "bg-blue-500 text-white";
      case "promo":
        return "bg-pink-500 text-white";
      case "alert":
        return "bg-red-500 text-white";
      case "event":
        return "bg-green-500 text-white";
      case "info":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const loadAnnouncements = async () => {
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      console.error("Error fetching announcements:", err.message);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const openEditModal = (announcement = null) => {
    if (announcement) {
      setEditId(announcement.id);
      setTitle(announcement.title);
      setType(announcement.type);
      setContent(announcement.content);
      setDate(announcement.date);
    } else {
      setEditId(null);
      setTitle("");
      setType("");
      setContent("");
      setDate("");
    }
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (!title || !type || !content || !date) return;

    try {
      if (editId) {
        const updated = await updateAnnouncement(
          editId,
          title,
          type,
          content,
          date
        );
        setAnnouncements(
          announcements.map((a) => (a.id === editId ? updated : a))
        );
      } else {
        const newAnnouncement = await createAnnouncement(
          title,
          type,
          content,
          date
        );
        setAnnouncements([newAnnouncement, ...announcements]);
      }

      setEditId(null);
      setTitle("");
      setType("");
      setContent("");
      setDate("");
      setOpenModal(false);
    } catch (err) {
      console.error("Error saving announcement:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteAnnouncement(id);
      setAnnouncements(announcements.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting announcement:", err.message);
    }
  };

  // Format date to readable string
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="px-8 py-6 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <Megaphone className="h-8 w-8 text-purple-600" />
                <h1 className="text-3xl font-bold text-black">Announcements</h1>
              </div>
              <p className="text-gray-500 text-sm">
                Stay updated with the latest news and updates from your website.
              </p>
            </div>

            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => openEditModal()}
            >
              <Plus className="h-4 w-4" /> Post Announcement
            </Button>
          </div>

          <div className="space-y-4">
            {announcements.map((a) => (
              <Card key={a.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(a.type)}>{a.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{a.title}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openEditModal(a)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(a.id)}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{a.content}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {formatDate(a.date)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogContent className="fixed top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg z-50">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-center">
                  {editId ? "Edit Announcement" : "Post Announcement"}
                </DialogTitle>
              </DialogHeader>

              <DialogClose asChild>
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </DialogClose>

              <div className="space-y-4 mt-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <Input
                    placeholder="Announcement title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="promo">Promo</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <Textarea
                    placeholder="Announcement content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleSave}
                >
                  {editId ? "Update" : "Post"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
