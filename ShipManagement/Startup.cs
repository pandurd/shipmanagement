using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ShipManagement.Repos;
using ShipManagement.Models;
using System;
using ShipManagement.Helpers;
using Serilog;

namespace ShipManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddDbContext<ShipContext>(option => option.UseInMemoryDatabase("Ship"));
            services.AddTransient<IShipRepo, ShipRepo>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ShipManagement", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                var options = new DbContextOptionsBuilder<ShipContext>()
                               .UseInMemoryDatabase(databaseName: "Ship")
                               .Options;

                using var context = new ShipContext(options);
                LoadInitialShipData(context);

                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ShipManagement v1"));
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseSerilogRequestLogging(); //

            app.UseMiddleware<ExceptionHandler>();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private void LoadInitialShipData(ShipContext context)
        {
            var Titanic = new Ship { ID = Guid.NewGuid(), Name = "Titanic", Code = "RRRI-3422-G6", Length = 120, Width = 100 };
            var Karaboudjan = new Ship { ID = Guid.NewGuid(), Name = "Karaboudjan", Code = "OOOI-1221-P9", Length = 40, Width = 22 };

            context.Ships.Add(Titanic);
            context.Ships.Add(Karaboudjan);

            for (int i = 0; i < 20; i++)
            {
                context.Ships.Add(new Ship { ID = Guid.NewGuid(), Name = i.ToString(), Code = "RRRI-3422-G6", Length = 120, Width = 100 });
            }

            context.SaveChanges();
        }
    }
}
