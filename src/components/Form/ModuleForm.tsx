import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"; // Adjust based on your ShadCN setup
import { Label } from "@/components/ui/label";
import { CreateModule } from "@/services/ModuleService";

// Define TypeScript type for form data
export type ModuleData = {
  id? : string
  moduleName: string;
  actions: number[]; // Array of selected action IDs
};

const ModuleForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ModuleData>();

  const [actions, setActions] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/actions");
        const resData = await response.json();
        
        setActions(resData.data);
      } catch (error) {
        console.error("Failed to fetch actions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, []);

  // Watch selected actions
  const selectedActions = watch("actions", []);

  const onSubmitModule = async (data: ModuleData) => {
    try {
        const response = await CreateModule(data);
    } catch (error) {
        
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Module</h2>
      <form onSubmit={handleSubmit(onSubmitModule)}>
        {/* Module Name Input */}
        <div className="mb-4">
          <Label htmlFor="moduleName">Module Name</Label>
          <input
            id="moduleName"
            {...register("moduleName", { required: "Module name is required" })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter module name"
          />
          {errors.moduleName && (
            <p className="text-red-500 text-sm">{errors.moduleName.message}</p>
          )}
        </div>

        {/* Actions (Checkbox List) */}
        <div className="mb-4">
          <Label>Actions</Label>
          {loading ? (
            <p>Loading actions...</p>
          ) : (
            actions.map((action) => (
              <div key={action.id} className="flex items-center gap-2 mt-2">
                <Controller
                  name="actions"
                  control={control}
                  defaultValue={[]} // Initialize as empty array
                  render={({ field }) => (
                    <Checkbox
                      checked={selectedActions.includes(action.id)}
                      onCheckedChange={(checked) => {
                        setValue(
                          "actions",
                          checked
                            ? [...selectedActions, action.id]
                            : selectedActions.filter((id) => id !== action.id)
                        );
                      }}
                    />
                  )}
                />
                <Label>{action.name}</Label>
              </div>
            ))
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Submit
        </button>
      </form>

      {/* Debugging - Show selected actions */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Selected Actions:</h3>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(selectedActions, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ModuleForm;
