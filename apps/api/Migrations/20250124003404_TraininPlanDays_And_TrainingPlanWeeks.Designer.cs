﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20250124003404_TraininPlanDays_And_TrainingPlanWeeks")]
    partial class TraininPlanDays_And_TrainingPlanWeeks
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api.Domain.TrainingPlanDays.TrainingPlanDay", b =>
                {
                    b.Property<Guid>("TrainingPlanDayId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte>("DayOfWeek")
                        .HasColumnType("tinyint");

                    b.Property<Guid>("TrainingPlanWeekId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("TrainingPlanDayId");

                    b.HasIndex("TrainingPlanWeekId");

                    b.ToTable("TrainingPlanDay");
                });

            modelBuilder.Entity("api.Domain.TrainingPlanWeeks.TrainingPlanWeek", b =>
                {
                    b.Property<Guid>("TrainingPlanWeekId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TrainingPlanId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("TrainingPlanWeekId");

                    b.HasIndex("TrainingPlanId");

                    b.ToTable("TrainingPlanWeeks");
                });

            modelBuilder.Entity("api.Domain.TrainingPlans.TrainingPlan", b =>
                {
                    b.Property<Guid>("TrainingPlanId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("TrainingPlanId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("TrainingPlans");
                });

            modelBuilder.Entity("api.Domain.TrainingPlanDays.TrainingPlanDay", b =>
                {
                    b.HasOne("api.Domain.TrainingPlanWeeks.TrainingPlanWeek", "TrainingPlanWeek")
                        .WithMany("TrainingPlanDays")
                        .HasForeignKey("TrainingPlanWeekId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TrainingPlanWeek");
                });

            modelBuilder.Entity("api.Domain.TrainingPlanWeeks.TrainingPlanWeek", b =>
                {
                    b.HasOne("api.Domain.TrainingPlans.TrainingPlan", "TrainingPlan")
                        .WithMany("TrainingPlanWeeks")
                        .HasForeignKey("TrainingPlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TrainingPlan");
                });

            modelBuilder.Entity("api.Domain.TrainingPlanWeeks.TrainingPlanWeek", b =>
                {
                    b.Navigation("TrainingPlanDays");
                });

            modelBuilder.Entity("api.Domain.TrainingPlans.TrainingPlan", b =>
                {
                    b.Navigation("TrainingPlanWeeks");
                });
#pragma warning restore 612, 618
        }
    }
}
