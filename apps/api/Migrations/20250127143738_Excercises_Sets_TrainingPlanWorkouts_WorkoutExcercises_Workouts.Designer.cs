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
    [DbContext(typeof(AppDbContext))]
    [Migration("20250127143738_Exercises_Sets_TrainingPlanWorkouts_WorkoutExercises_Workouts")]
    partial class Exercises_Sets_TrainingPlanWorkouts_WorkoutExercises_Workouts
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api.Domain.Exercises.Exercise", b =>
                {
                    b.Property<Guid>("ExerciseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ExerciseId");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("api.Domain.Sets.Set", b =>
                {
                    b.Property<Guid>("SetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Reps")
                        .HasColumnType("int");

                    b.Property<int>("Rir")
                        .HasColumnType("int");

                    b.Property<Guid>("WorkoutExerciseId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("SetId");

                    b.ToTable("Sets");
                });

            modelBuilder.Entity("api.Domain.TrainingPlanWorkouts.TrainingPlanWorkout", b =>
                {
                    b.Property<Guid>("Guid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte>("Order")
                        .HasColumnType("tinyint");

                    b.Property<Guid>("TrainingPlanId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("WorkoutId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Guid");

                    b.HasIndex("TrainingPlanId");

                    b.HasIndex("WorkoutId");

                    b.ToTable("TrainingPlanWorkouts");
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

                    b.Property<byte>("Weeks")
                        .HasColumnType("tinyint");

                    b.HasKey("TrainingPlanId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("TrainingPlans");
                });

            modelBuilder.Entity("api.Domain.WorkoutExercises.WorkoutExercise", b =>
                {
                    b.Property<Guid>("WorkoutExerciseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ExerciseId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte>("Order")
                        .HasColumnType("tinyint");

                    b.Property<Guid>("WorkoutId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("WorkoutExerciseId");

                    b.HasIndex("ExerciseId");

                    b.HasIndex("WorkoutId");

                    b.ToTable("WorkoutExercises");
                });

            modelBuilder.Entity("api.Domain.Workouts.Workout", b =>
                {
                    b.Property<Guid>("WorkoutId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("WorkoutId");

                    b.ToTable("Workouts");
                });

            modelBuilder.Entity("api.Domain.TrainingPlanWorkouts.TrainingPlanWorkout", b =>
                {
                    b.HasOne("api.Domain.TrainingPlans.TrainingPlan", "TrainingPlan")
                        .WithMany()
                        .HasForeignKey("TrainingPlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Domain.Workouts.Workout", "Workout")
                        .WithMany()
                        .HasForeignKey("WorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TrainingPlan");

                    b.Navigation("Workout");
                });

            modelBuilder.Entity("api.Domain.WorkoutExercises.WorkoutExercise", b =>
                {
                    b.HasOne("api.Domain.Exercises.Exercise", "Exercise")
                        .WithMany()
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Domain.Workouts.Workout", "Workout")
                        .WithMany()
                        .HasForeignKey("WorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exercise");

                    b.Navigation("Workout");
                });
#pragma warning restore 612, 618
        }
    }
}
