import axios from "axios";
import {
  Coffee,
  Drumstick,
  Edit,
  IceCream,
  Plus,
  Soup,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
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
import { StatsCard } from "../ui/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

// Categories for dropdown (including a "None" option)
const categories = [
  "None", // Show "None" in the dropdown
  "Best Seller",
  "Most Bought",
  "New Arrival",
  "Limited Offer",
  "Recommended",
  "Combo Meal",
  "Specialty",
];

// Groups for tab organization
const groups = [
  "Main Course",
  "Dessert",
  "Appetizer",
  "Beverage",
  "Combo Meal",
];

// ======================
// MENU ITEMS API
// ======================
const API_URL = "http://localhost:5000/api/menu";

// Function to handle HTTP requests
const apiRequest = async (method, url, data = null) => {
  try {
    const config = {
      method,
      url,
      data,
    };
    const response = await axios(config);
    return response.data;
  } catch (err) {
    console.error(
      `API Error (${method} ${url}):`,
      err.response ? err.response.data : err.message
    );
    throw new Error(
      err.response ? err.response.data.message : "An error occurred"
    );
  }
};

// ======================
// MENU API FUNCTIONS
// ======================
export const fetchMenuItems = async () => {
  return apiRequest("GET", API_URL);
};

export const createMenuItem = async (menuItem) => {
  if (!menuItem.name || !menuItem.price || !menuItem.group) {
    throw new Error("Name, price, and group are required fields.");
  }

  const data = {
    name: menuItem.name,
    category: menuItem.category === "None" ? null : menuItem.category, // Convert "None" to null if category is not provided
    price: parseInt(menuItem.price), // Ensure price is an integer
    description: menuItem.description || null,
    group: menuItem.group,
  };

  return apiRequest("POST", API_URL, data);
};

export const updateMenuItem = async (id, updatedItem) => {
  if (!updatedItem.name || !updatedItem.price || !updatedItem.group) {
    throw new Error("Name, price, and group are required fields.");
  }

  const data = {
    name: updatedItem.name,
    category: updatedItem.category === "None" ? null : updatedItem.category, // Convert "None" to null
    price: parseInt(updatedItem.price), // Ensure price is an integer
    description: updatedItem.description || null,
    group: updatedItem.group,
  };

  return apiRequest("PUT", `${API_URL}/${id}`, data);
};

export const deleteMenuItem = async (id) => {
  return apiRequest("DELETE", `${API_URL}/${id}`);
};

// ======================
// MAIN COMPONENT
// ======================

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    price: "",
    description: "",
    category: "None", // Default category is "None"
    group: "Main Course",
  });
  const [selectedGroup, setSelectedGroup] = useState("Main Course");
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages
  const [successMessage, setSuccessMessage] = useState(""); // To handle success message

  // Fetch the menu items from the backend
  useEffect(() => {
    const fetchMenuItemsData = async () => {
      try {
        const menuData = await fetchMenuItems();
        // Ensure we handle "None" as null
        const updatedMenuData = menuData.map((item) => ({
          ...item,
          category: item.category === "None" ? null : item.category,
        }));
        setMenu(updatedMenuData || []);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
      }
    };
    fetchMenuItemsData();
  }, []);

  // Badge color helper
  const getCategoryColor = (category) => {
    switch (category) {
      case "Best Seller":
        return "bg-yellow-500 text-white";
      case "Specialty":
        return "bg-purple-500 text-white";
      case "Most Bought":
        return "bg-blue-500 text-white";
      case "New Arrival":
        return "bg-green-500 text-white";
      case "Limited Offer":
        return "bg-orange-500 text-white";
      case "Recommended":
        return "bg-pink-500 text-white";
      case "Combo Meal":
        return "bg-indigo-500 text-white";
      case "None":
        return null; // No badge color for "None"
      default:
        return "bg-gray-300 text-black";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Best Seller":
        return <Drumstick className="h-4 w-4 text-white" />;
      case "Specialty":
        return <Soup className="h-4 w-4 text-white" />;
      case "Most Bought":
        return <Coffee className="h-4 w-4 text-white" />;
      case "New Arrival":
        return <Drumstick className="h-4 w-4 text-white" />;
      case "Limited Offer":
        return <Coffee className="h-4 w-4 text-white" />;
      case "Recommended":
        return <IceCream className="h-4 w-4 text-white" />;
      case "Combo Meal":
        return <Drumstick className="h-4 w-4 text-white" />;
      case "None":
        return null; // No icon for "None"
      default:
        return null;
    }
  };

  // Menu item card
  const MenuItemCard = ({ item, onEdit, onDelete }) => (
    <Card className="hover:shadow-xl transition p-4">
      <CardContent className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black">{item.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{item.description}</p>
          <div className="flex gap-2">
            {/* Only render category badge if category is neither "None" nor null */}
            {item.category && item.category !== "None" && (
              <Badge
                className={`flex items-center gap-1 ${getCategoryColor(
                  item.category
                )}`}
              >
                {getCategoryIcon(item.category)} {item.category}
              </Badge>
            )}
            <Badge className="bg-gray-200 text-gray-800">{item.group}</Badge>
          </div>
        </div>
        <div className="text-right flex flex-col justify-between">
          <div className="text-xl font-bold text-black mb-2">{item.price}</div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(item.id)} // Call delete function
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const openModal = (item = null) => {
    setSelectedItem(
      item || {
        name: "",
        price: "",
        description: "",
        category: "None", // Default category is "None"
        group: "Main Course", // Default group
      }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    setErrorMessage(""); // Clear error message
    setSuccessMessage(""); // Clear success message
  };

  // Handle "None" category correctly before sending to the backend
  const handleSave = async () => {
    const { name, category, price, description, group, id } = selectedItem;

    // Frontend Validation
    if (!name || !price || !description) {
      let missingFields = [];
      if (!name) missingFields.push("Name");
      if (!price) missingFields.push("Price");
      if (!description) missingFields.push("Description");

      // Set detailed error message showing which fields are missing
      setErrorMessage(`${missingFields.join(", ")} are required.`);

      // Close the modal immediately when validation fails
      setModalOpen(false);
      return; // Prevent API call if fields are missing
    }

    try {
      // Handle the "None" category case, set it to null if "None" is selected
      const validCategory = category === "None" ? null : category;

      if (id) {
        // Editing an existing item
        const response = await updateMenuItem(id, {
          name,
          category: validCategory, // Set "None" to null
          price,
          description,
          group,
        });
        setMenu((prev) =>
          prev.map((item) => (item.id === id ? response : item))
        );
      } else {
        // Adding a new item
        const response = await createMenuItem({
          name,
          category: validCategory, // Set "None" to null
          price,
          description,
          group,
        });
        setMenu([...menu, response]);
      }

      setSuccessMessage("Menu item saved successfully!");
      closeModal(); // Close modal after successful save
    } catch (err) {
      setErrorMessage("Failed to save menu item: " + err.message);
    }
  };

  // Handle delete menu item
  // Handle delete menu item
  // Handle delete menu item
  const handleDelete = async (id) => {
    try {
      // Send delete request to the backend
      const response = await axios.delete(
        `http://localhost:5000/api/menu/${id}`
      );

      // If the server responds with status 200 (successful deletion)
      if (response.status === 200) {
        // Remove the deleted item from the local state (UI)
        setMenu((prevMenu) => prevMenu.filter((item) => item.id !== id));
      } else {
        // If the response is not 200, log it and show an alert
        console.error("Failed to delete item:", response);
        alert("Error deleting menu item.");
      }
    } catch (err) {
      // Catch and log any errors that occur during the request
      console.error("Error deleting menu item:", err);
      alert("Error deleting menu item: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="px-8 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-black">Menu Management</h1>
              <p className="text-gray-500 mb-6">
                Manage your Filipino cuisine menu items
              </p>
            </div>
            <Button
              onClick={() => openModal()}
              className="bg-accent hover:bg-accent/90 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Menu Item
            </Button>
          </div>

          {/* Error and Success Messages */}
          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-6">
            <StatsCard
              title="Main Course"
              value={menu.filter((item) => item.group === "Main Course").length}
              icon={Drumstick}
              iconColor="bg-blue-400"
            />
            <StatsCard
              title="Appetizer"
              value={menu.filter((item) => item.group === "Appetizer").length}
              icon={Coffee}
              iconColor="bg-yellow-400"
            />
            <StatsCard
              title="Dessert"
              value={menu.filter((item) => item.group === "Dessert").length}
              icon={IceCream}
              iconColor="bg-pink-400"
            />
            <StatsCard
              title="Beverage"
              value={menu.filter((item) => item.group === "Beverage").length}
              icon={Soup}
              iconColor="bg-green-400"
            />
            <StatsCard
              title="Combo Meal"
              value={menu.filter((item) => item.group === "Combo Meal").length}
              icon={Drumstick}
              iconColor="bg-indigo-400"
            />
          </div>

          {/* Tabs */}
          <Tabs
            value={selectedGroup}
            onValueChange={setSelectedGroup}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 gap-2 mt-4">
              {groups.map((group) => (
                <TabsTrigger
                  key={group}
                  value={group}
                  className="flex items-center justify-center gap-1"
                >
                  {group}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Display menu items based on selected tab */}
            {groups.map((group) => (
              <TabsContent key={group} value={group}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {menu
                    .filter((item) => item.group === group)
                    .map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onEdit={openModal}
                        onDelete={handleDelete} // Pass delete handler
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Modal */}
          {modalOpen && (
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogContent className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg z-50">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-center">
                    {selectedItem?.id ? "Edit Menu Item" : "Add Menu Item"}{" "}
                    {/* Dynamic title */}
                  </DialogTitle>
                </DialogHeader>
                <DialogClose asChild>
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    X
                  </button>
                </DialogClose>
                <div className="space-y-3 mt-2">
                  <Input
                    name="name"
                    placeholder="Enter the dish name (e.g., Chicken Adobo)"
                    value={selectedItem?.name}
                    onChange={(e) =>
                      setSelectedItem((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    name="price"
                    placeholder="Enter price (e.g., 12)"
                    value={selectedItem?.price}
                    onChange={(e) =>
                      setSelectedItem((prev) => ({
                        ...prev,
                        price: e.target.value.replace(/[^\d]/g, ""), // Restrict to integers only
                      }))
                    }
                    inputMode="numeric"
                    type="text" // For controlling input as numeric
                  />
                  <Input
                    name="description"
                    placeholder="Enter a brief description (e.g., Delicious chicken stew)"
                    value={selectedItem?.description}
                    onChange={(e) =>
                      setSelectedItem((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />

                  {/* Category Dropdown */}
                  <Select
                    value={selectedItem?.category}
                    onValueChange={(val) =>
                      setSelectedItem((prev) => ({
                        ...prev,
                        category: val,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Group Dropdown */}
                  <Select
                    value={selectedItem?.group}
                    onValueChange={(val) =>
                      setSelectedItem((prev) => ({ ...prev, group: val }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((grp) => (
                        <SelectItem key={grp} value={grp}>
                          {grp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  );
}
