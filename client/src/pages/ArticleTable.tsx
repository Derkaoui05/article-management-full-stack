'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Article } from '@/services/article-service';
import { deleteArticle, getArticles } from '@/services/article-service';
import { Edit3, Package, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ArticleTable() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const navigate = useNavigate();
  const { code: deleteCode } = useParams<{ code: string }>();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticles();
      setArticles(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Erreur lors de la récupération des articles. Veuillez réessayer.');
      console.error('Erreur lors de la récupération des articles :', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (deleteCode) {
      const article = articles.find((a) => a.code === deleteCode);
      if (article) {
        setArticleToDelete(article);
        setDeleteDialogOpen(true);
      }
    }
  }, [deleteCode, articles]);

  const handleDelete = async () => {
    if (!articleToDelete) return;

    try {
      setLoading(true);
      await deleteArticle(articleToDelete.code);
      await fetchData();
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
      navigate('/articles');
    } catch (error) {
      setError("Erreur lors de la suppression de l'article. Veuillez réessayer.");
      console.error('Error deleting article:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(price);
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
            <div className="mt-6 flex justify-center">
              <Button onClick={fetchData} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Réessayer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            Gestion des Articles
          </h1>
          <p className="text-muted-foreground">
            Gérez votre inventaire d'articles et leurs informations
          </p>
        </div>
        <Link to="/articles/new">
          <Button className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
            <Plus className="h-4 w-4" />
            Ajouter un article
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Liste des articles
              {!loading && (
                <Badge variant="secondary" className="ml-2">
                  {articles.length} article{articles.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </CardTitle>
            {!loading && articles.length > 0 && (
              <Button
                onClick={fetchData}
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="h-4 w-4" />
                Actualiser
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold text-foreground">Code</TableHead>
                  <TableHead className="font-semibold text-foreground">Désignation</TableHead>
                  <TableHead className="font-semibold text-foreground">Prix</TableHead>
                  <TableHead className="font-semibold text-foreground text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : !Array.isArray(articles) ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3 text-muted-foreground">
                        <Package className="h-12 w-12 opacity-50" />
                        <p className="text-lg font-medium">Erreur: Format de données invalide</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : articles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3 text-muted-foreground">
                        <Package className="h-12 w-12 opacity-50" />
                        <p className="text-lg font-medium">Aucun article trouvé</p>
                        <p className="text-sm">Commencez par ajouter votre premier article</p>
                        <Link to="/articles/new">
                          <Button className="mt-2 gap-2">
                            <Plus className="h-4 w-4" />
                            Ajouter un article
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  articles.map((article) => (
                    <TableRow
                      key={article.code}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <TableCell className="font-mono font-medium">
                        <Badge variant="outline" className="font-mono">
                          {article.code}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{article.designation}</TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {formatPrice(article.price)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                          <Link to={`/articles/update/${article.code}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 dark:hover:bg-orange-950 dark:hover:border-orange-800 dark:hover:text-orange-300"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              Modifier
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 dark:hover:bg-red-950 dark:hover:border-red-800 dark:hover:text-red-300"
                            onClick={() => {
                              setArticleToDelete(article);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'article "{articleToDelete?.designation}" sera
              définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteDialogOpen(false);
                setArticleToDelete(null);
                navigate('/articles');
              }}
            >
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                'Supprimer'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ArticleTable;
