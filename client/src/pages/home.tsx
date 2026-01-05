'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Article } from '@/services/article-service';
import { getArticles } from '@/services/article-service';
import { ArrowRight, Package, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(Array.isArray(data) ? data.slice(0, 6) : []); // Show only 6 articles
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Bienvenue sur <span className="text-primary">ArticleHub</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez notre collection d'articles de qualité. Gérez votre inventaire avec facilité
              et efficacité.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/articles">
                <Button size="lg" className="gap-2">
                  <Package className="h-5 w-5" />
                  Gérer les articles
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                <ShoppingCart className="h-5 w-5" />
                Voir le catalogue
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Articles en vedette</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Découvrez notre sélection d'articles les plus populaires
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </CardContent>
                </Card>
              ))
            ) : articles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Aucun article disponible</h3>
                <p className="mt-2 text-muted-foreground">
                  Commencez par ajouter des articles à votre catalogue
                </p>
              </div>
            ) : (
              articles.map((article) => (
                <Card key={article.code} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="font-mono text-sm">{article.code}</span>
                      <span className="text-primary font-semibold">
                        {formatPrice(article.price)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium">{article.designation}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full gap-2 group-hover:bg-primary/5">
                      Voir les détails
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          {articles.length > 0 && (
            <div className="mt-12 text-center">
              <Link to="/articles">
                <Button variant="outline" size="lg" className="gap-2">
                  Voir tous les articles
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <footer className="mt-auto border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ArticleHub</h3>
              <p className="text-muted-foreground">
                Votre solution de gestion d'articles simple et efficace.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/articles"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Gérer les articles
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-muted-foreground">
                Pour toute question, n'hésitez pas à nous contacter.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} ArticleHub. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
