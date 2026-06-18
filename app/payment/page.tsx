import { CreditCard, Home, FileText } from "lucide-react";
import Link from "next/link";

const fees = [
  {
    name: "Tuition Fee",
    amount: "₦250,000",
    icon: CreditCard,
    color: "border-green-500",
    href: "/tuition"
  },
  {
    name: "Hostel Fee", 
    amount: "₦80,000",
    icon: Home,
    color: "border-orange-500",
    href: "/hostel"
  },
  {
    name: "Other Charges",
    amount: "₦15,000", 
    icon: FileText,
    color: "border-blue-500",
    href: "/others"
  }
];

export default function PaymentInfo() {
  return (
    <div className="p-6 md:p-8">
      
      {/* Green bar like Dashboard welcome */}
      <div className="bg-green-600 text-white p-6 rounded-2xl mb-8 shadow-lg">
        <h1 className="text-3xl font-bold">Payment Information</h1>
        <p className="text-green-100 mt-2">View all your school fees and charges here</p>
      </div>
      
      {/* Fee Cards - No Paid/Pending */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fees.map((fee) => {
          const Icon = fee.icon;
          return (
            <Link href={fee.href} key={fee.name} className="block">
              <div className={`bg-white p-6 rounded-2xl shadow-lg border-t-4 ${fee.color} hover:shadow-2xl hover:scale-105 transition-all cursor-pointer`}>
                <Icon size={40} className="text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{fee.name}</h3>
                <p className="text-3xl font-bold text-gray-900">{fee.amount}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}