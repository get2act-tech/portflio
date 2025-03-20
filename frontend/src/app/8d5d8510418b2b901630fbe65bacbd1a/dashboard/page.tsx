'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { Mongoose } from "mongoose"

export default function DashboardPage() {
  const [totalBlogPosts, setTotalBlogPosts] = useState(0)
  const [totalTeamMembers, setTotalTeamMembers] = useState(0)
  const [totalContactRequests, setContactRequests] = useState(0)
  
  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('https://back-get-2-act-git-main-get2act-techs-projects.vercel.app/api/dashboardStats/',{
        method: "GET"
      });
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      const data = await response.json();
      setTotalBlogPosts(data['totalBlogPosts']);
      setTotalTeamMembers(data['totalTeamMembers']);
      setContactRequests(data['totalContactRequests']);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);


  useEffect(() => {
    fetchDashboardStats()
  })
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#00415f]">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBlogPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeamMembers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Requests</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContactRequests}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

