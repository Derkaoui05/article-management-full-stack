'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Article } from '@/services/article-service';
import { createArticle, getArticleByCode, updateArticle } from '@/services/article-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as z from 'zod';

const articleFormSchema = z.object({
  code: z
    .string()
    .min(1, 'Le code est requis')
    .max(50, 'Le code ne doit pas dépasser 50 caractères'),
  designation: z
    .string()
    .min(1, 'La désignation est requise')
    .max(100, 'La désignation ne doit pas dépasser 100 caractères'),
  price: z
    .string()
    .min(1, 'Le prix est requis')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Le prix doit être un nombre positif'),
});

type ArticleFormValues = z.infer<typeof articleFormSchema>;

export default function ArticleForm() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = Boolean(code);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      code: '',
      designation: '',
      price: '',
    },
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (!code) return;

      try {
        setLoading(true);
        const article = await getArticleByCode(code);
        form.reset({
          code: article.code,
          designation: article.designation,
          price: article.price.toString(),
        });
      } catch (error) {
        setError("Erreur lors de la récupération de l'article. Veuillez réessayer.");
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [code, form]);

  const onSubmit = async (data: ArticleFormValues) => {
    try {
      setLoading(true);
      setError(null);

      const articleData: Article = {
        code: data.code,
        designation: data.designation,
        price: Number(data.price),
      };

      if (isEditMode && code) {
        await updateArticle(code, {
          designation: articleData.designation,
          price: articleData.price,
        });
      } else {
        await createArticle(articleData);
      }

      navigate('/articles');
    } catch (error) {
      setError("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
      console.error('Error saving article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/articles')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditMode ? "Modifier l'article" : 'Nouvel article'}
        </h1>
      </div>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-xl font-semibold">
            {isEditMode
              ? "Modifier les informations de l'article"
              : "Remplissez les informations de l'article"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrez le code de l'article"
                        disabled={isEditMode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Désignation</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Entrez la désignation de l'article" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (MAD)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Entrez le prix de l'article"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/articles')}
                  disabled={loading}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={loading} className="gap-2">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isEditMode ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
