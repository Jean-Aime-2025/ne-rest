import ExitReport from "@/components/common/ExitReport"
import RegisterCarExitForm from "@/components/forms/RegisterCarExitForm"
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

const CarExit = () => {
  return (
    <Tabs defaultValue="entry" className="p-6">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="entry">Create Exit</TabsTrigger>
        <TabsTrigger value="report">Generate Report</TabsTrigger>
      </TabsList>
      <TabsContent value="entry">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Car Exit</CardTitle>
            <CardDescription>
              Exit car from your the parking.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RegisterCarExitForm/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="report">
        <ExitReport/>
      </TabsContent>
    </Tabs>
  )
}

export default CarExit