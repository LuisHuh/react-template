/**
 * Crea enlaces simbólicos de las carpetas principales a node_modules.
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 */

/* This example works only under z/OS XL C, not z/OS XL C++  */
#define _POSIX1_SOURCE 2
#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
   // Get current directory
   char cwd[1024];
   getcwd(cwd, sizeof(cwd));

   // Config directory
   char configDir[1024] = "";
   strcpy(configDir, cwd);
   strcat(configDir, "/config");

   // Node and Client directory
   char nodeModules[1024] = "";
   strcpy(nodeModules, cwd);
   strcat(nodeModules, "/node_modules");

   char clientDirectory[1024] = "";
   strcpy(clientDirectory, cwd);
   strcat(clientDirectory, "/src/client");

   // Folders in client
   char app[1024] = "";
   strcpy(app, clientDirectory);
   strcat(app, "/app");

   char components[1024] = "";
   strcpy(components, clientDirectory);
   strcat(components, "/components");

   char docs[1024] = "";
   strcpy(docs, clientDirectory);
   strcat(docs, "/docs");

   char templates[1024] = "";
   strcpy(templates, clientDirectory);
   strcat(templates, "/templates");

   char views[1024] = "";
   strcpy(views, clientDirectory);
   strcat(views, "/views");

   // Folders to link un node_modules
   char configNode[1024] = "";
   strcpy(configNode, nodeModules);
   strcat(configNode, "/@config");

   char appNode[1024] = "";
   strcpy(appNode, nodeModules);
   strcat(appNode, "/@app");

   char componentsNode[1024] = "";
   strcpy(componentsNode, nodeModules);
   strcat(componentsNode, "/@components");

   char docsNode[1024] = "";
   strcpy(docsNode, nodeModules);
   strcat(docsNode, "/@docs");

   char templatesNode[1024] = "";
   strcpy(templatesNode, nodeModules);
   strcat(templatesNode, "/@templates");

   char viewsNode[1024] = "";
   strcpy(viewsNode, nodeModules);
   strcat(viewsNode, "/@views");

   // Deletes all symbolics link
   unlink(configNode);
   unlink(appNode);
   unlink(componentsNode);
   unlink(docsNode);
   unlink(templatesNode);
   unlink(viewsNode);

   puts("\n=== Creando enlaces simbolicos ===\n");

   // ==== Add Symbolics link ====

   // Enlace simbolico para config
   if (symlink(app, configNode) != 0)
   {
      perror("Config no se pudo enlazar");
      unlink(app);
   }
   else
      puts("Config enlazado en node_modules\n");

   // Enlace simbolico para app
   if (symlink(app, appNode) != 0)
   {
      perror("App en client no se pudo enlazar");
      unlink(app);
   }
   else
      puts("App enlazado en node_modules\n");

   // Enlace simbolico para components
   if (symlink(components, componentsNode) != 0)
   {
      perror("Components en client no se pudo enlazar");
      unlink(components);
   }
   else
      puts("Components enlazado en node_modules\n");

   // Enlace simbolico para docs
   if (symlink(docs, docsNode) != 0)
   {
      perror("Doc en client no se pudo enlazar");
      unlink(docs);
   }
   else
      puts("Docs enlazado en node_modules\n");

   // Enlace simbolico para templates
   if (symlink(templates, templatesNode) != 0)
   {
      perror("Templates en client no se pudo enlazar");
      unlink(templates);
   }
   else
      puts("Templates enlazado en node_modules\n");

   // Enlace simbolico para views
   if (symlink(views, viewsNode) != 0)
   {
      perror("Views en client no se pudo enlazar");
      unlink(views);
   }
   else
      puts("Views enlazado en node_modules\n");

   return 0;
}