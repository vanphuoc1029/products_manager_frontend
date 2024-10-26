import MenuIcon from "@/components/icons/MenuIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type Props = {};

const NewProductsPage = ({}: Props) => {
  <div className="flex-1 flex flex-col min-h-0">
    <header className="flex h-14 items-center gap-4 border-b bg-white px-6 dark:bg-gray-950">
      <MenuIcon className="h-6 w-6 md:hidden" />
      <h1 className="font-medium text-lg">Products</h1>
      <form className="ml-auto flex w-full md:w-auto">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full md:w-[200px] bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
          />
        </div>
      </form>
      <Button variant="ghost" size="icon" className="rounded-full">
        <img
          src="/placeholder.svg"
          width="32"
          height="32"
          className="rounded-full"
          alt="Avatar"
          style={{ aspectRatio: "32/32", objectFit: "cover" }}
        />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </header>
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Products</h1>
        <Button className="ml-auto" size="sm">
          Add product
        </Button>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Inventory</TableHead>
              <TableHead>Vendor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-gray-100/40 dark:bg-gray-800/40">
              <TableCell>
                <img
                  src="/placeholder.svg"
                  width="64"
                  height="64"
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Glimmer Lamps</TableCell>
              <TableCell className="hidden md:table-cell">
                In Production
              </TableCell>
              <TableCell>500 in stock</TableCell>
              <TableCell className="hidden md:table-cell">
                Luminance Creations
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <img
                  src="/placeholder.svg"
                  width="64"
                  height="64"
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Aqua Filters</TableCell>
              <TableCell className="hidden md:table-cell">
                Available for Order
              </TableCell>
              <TableCell>750 in stock</TableCell>
              <TableCell className="hidden md:table-cell">
                HydraClean Solutions
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <img
                  src="/placeholder.svg"
                  width="64"
                  height="64"
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Eco Planters</TableCell>
              <TableCell className="hidden md:table-cell">
                Backordered
              </TableCell>
              <TableCell>300 in stock</TableCell>
              <TableCell className="hidden md:table-cell">
                GreenGrowth Designers
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <img
                  src="/placeholder.svg"
                  width="64"
                  height="64"
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Zest Juicers</TableCell>
              <TableCell className="hidden md:table-cell">
                Newly Launched
              </TableCell>
              <TableCell>1000 in stock</TableCell>
              <TableCell className="hidden md:table-cell">
                FreshTech Appliances
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <img
                  src="/placeholder.svg"
                  width="64"
                  height="64"
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Flexi Wearables</TableCell>
              <TableCell className="hidden md:table-cell">
                Selling Fast
              </TableCell>
              <TableCell>200 in stock</TableCell>
              <TableCell className="hidden md:table-cell">
                Vitality Gear Co.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  </div>;
};

export default NewProductsPage;
