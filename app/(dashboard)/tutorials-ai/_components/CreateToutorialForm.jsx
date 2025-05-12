'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray } from 'react-hook-form';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Trash2,
  Plus,
  Sparkles,
  Lightbulb,
  SquarePen,
  InfoIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CreateTutorialForm = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const form = useForm({
    defaultValues: {
      title: '',
      units: [{ title: '' }, { title: '' }, { title: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'units',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const addUnit = () => {
    if (fields.length < 10 && !isAnimating) {
      setIsAnimating(true);
      append({ title: '' });
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const removeUnit = () => {
    if (fields.length > 1 && !isAnimating) {
      setIsAnimating(true);
      remove(fields.length - 1);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="mt-8 w-full">
      <Card className="overflow-hidden border-none bg-white shadow-custom">
        <CardHeader className="border-b bg-slate-50 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-100 p-2 text-blue-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-medium">
                  Create AI Tutorial
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  Customize your learning experience
                </CardDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-blue-50 px-3 py-1 text-blue-700"
            >
              {fields.length}/10 Units
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-blue-100 p-1.5 text-blue-600">
                <InfoIcon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="mb-1 font-medium text-blue-800">How it works</h4>
                <p className="text-sm leading-relaxed text-blue-700">
                  Enter a course title or subject you're interested in
                  exploring. Add a list of specific topics you want to master.
                  Our AI will create a personalized tutorial tailored to your
                  academic needs!
                </p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium text-slate-800">Main Topic</h3>
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="What would you like to learn about? (e.g., Quantum Physics)"
                          className="rounded-md border-slate-200 py-2.5 text-base shadow-sm focus:border-blue-400 focus:ring-blue-400"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SquarePen className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-slate-800">
                      Learning Units
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={removeUnit}
                      disabled={fields.length <= 1 || isAnimating}
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Remove
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addUnit}
                      disabled={fields.length >= 10 || isAnimating}
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <AnimatePresence initial={false}>
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{
                          type: 'spring',
                          damping: 25,
                          stiffness: 350,
                          duration: 0.2,
                        }}
                      >
                        <FormField
                          control={form.control}
                          name={`units.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-3">
                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-slate-100 text-slate-700">
                                  <span className="text-xs font-medium">
                                    {index + 1}
                                  </span>
                                </div>
                                <FormControl className="flex-1">
                                  <Input
                                    placeholder={`Specific topic you want to learn (e.g., "Wave-particle duality")`}
                                    className="rounded-md border-slate-200 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" size="lg">
                  Generate Tutorial
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTutorialForm;
