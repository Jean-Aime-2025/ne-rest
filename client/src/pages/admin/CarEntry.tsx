import EntryReport from "@/components/common/EntryReport"
import RegisterCarEntryForm from "@/components/forms/RegisterCarEntryForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const CarEntry = () => {
  return (
    <Tabs defaultValue="entry" className="p-6">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="entry">Create Entry</TabsTrigger>
        <TabsTrigger value="report">Generate Report</TabsTrigger>
      </TabsList>
      <TabsContent value="entry">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Car Entry</CardTitle>
            <CardDescription>
              Create a new car entry in the parking system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RegisterCarEntryForm/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="report">
        <EntryReport/>
      </TabsContent>
    </Tabs>
  )
}

export default CarEntry